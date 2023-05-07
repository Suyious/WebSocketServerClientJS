import "./style.css"
import Container from "../../../elements/container";
import Form from "../../../elements/form";
import { useCallback, useState } from "react";
import { ConversationContextType, useConversations } from "../../../../context/ConversationProvider";
import Message from "./message";

type MessagesProps = {
    id: string,
}

const Messages = ({id}: MessagesProps) => {

    const [ inputMessage, setInputMessage ] = useState<string>("");
    const { conversations, selectedConversation, sendMessageToConversation } = useConversations() as ConversationContextType;
    let firstCall = true;
    const latestMessage:React.RefCallback<HTMLDivElement> = useCallback(node => {
        if(node) {
            if(firstCall) {
                node.scrollIntoView();
                firstCall = false;
            } else {
                node.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        sendMessageToConversation(inputMessage);
        setInputMessage("");
    }

    return (
        <Container.Flex variant="flex-top" className="messages_body" style={{ width: "100%", padding: "1em", maxHeight: "100vh"}}>
            <Container.Flex variant="flex-top" style={{ flex: "1", overflowY: "scroll" }}>
                { conversations.length !== 0 &&
                    conversations[selectedConversation].messages.map((message, index) => (
                        <Message
                            ref={ index === conversations[selectedConversation].messages.length - 1 ?
                                latestMessage : null }
                            outgoing={message.sender === id} key={index}>
                            {message.message}
                        </Message>
                ))}
            </Container.Flex>
            <Form onSubmit={onSubmit} variant="row" className="messages_message_input_body">
                <Form.Input className="messages_message_input_input" value={inputMessage} onChange={e => setInputMessage(e.target.value)} variant="plain" placeholder="Type message..."/>
                <Form.Button type="submit" variant="plain" disabled={!inputMessage}>Send</Form.Button>
            </Form>
        </Container.Flex>
    )
}

export default Messages;