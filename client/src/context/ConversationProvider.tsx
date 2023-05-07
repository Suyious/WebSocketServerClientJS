import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Contact, ContactContextType, useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

export interface Message {
    sender: string,
    message: string,
}

export interface Conversation {
    recipients: Contact[],
    messages: Message[],
}

export type ConversationContextType = {
    conversations: Conversation[],
    selectedConversation: number,
    setSelectedConversation: React.Dispatch<React.SetStateAction<number>>,
    createConversations: (recipients: string[]) => void,
    sendMessageToConversation: (message:string) => void,
}

type ConversationProviderArgs = {
    id: string,
    children: React.ReactNode
}

const ConversationContext = createContext<ConversationContextType | null>(null);

export function useConversations() {
    return useContext(ConversationContext);
}

export function ConversationProvider({ id, children }: ConversationProviderArgs) {

    const [ conversations, setConversations ] = useLocalStorage<Conversation[]>(`conversation-${id}`, []);
    const [ selectedConversation, setSelectedConversation ] = useState<number>(0);
    const { contacts } = useContacts() as ContactContextType;
    const socket = useSocket();

    function createConversations(recipientIDs: string[]) {
        setConversations( prev => {
            // map each recipient ID to its correcponding contact { id, name }
            const recipients = recipientIDs.map(recipient => {
                const contact = contacts.find(contact => {
                    return contact.id === recipient;
                })
                const name = (contact && contact.name) || recipient;
                return { id: recipient, name }
            })
            return [...prev, { recipients, messages: []}]
        })
    }

    function recipientsEqual(recipientIDs: string[], recipients: Contact[]) {
        return recipients.length === recipientIDs.length && recipients.some( r => recipientIDs.includes(r.id));
    }

    useEffect(() => {
        if(socket) {
            socket.on('message-receive', ({ recipients, sender, message}) => {
                console.log("hello");
                setConversations( prev => {
                    const updatedConversation = [...prev];
                    prev.forEach((conversation, index) => {
                        if(recipientsEqual(recipients, conversation.recipients)) {
                            console.log(index);
                            updatedConversation[index].messages.push({
                                sender,
                                message
                            });
                        }
                    })
                    return updatedConversation;
                })
            })
        }
        () => socket?.off("message-receive");
    }, [socket])

    function sendMessageToConversation(message: string) {
        
        const recipientIDs = conversations[selectedConversation].recipients.map(r => r.id);
        socket?.emit("message-send", { recipients: recipientIDs, message })

        setConversations( prev => {
            const updatedConversation = [...prev];
            updatedConversation[selectedConversation].messages.push({
                sender: id,
                message
            })
            return updatedConversation;  
        })
    }

    const value = {
        conversations,
        selectedConversation,
        setSelectedConversation,
        createConversations,
        sendMessageToConversation,
    }

    return (
        <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>
    )
}