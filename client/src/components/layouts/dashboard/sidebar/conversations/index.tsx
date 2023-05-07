import "./style.css"
import { ConversationContextType, useConversations } from "../../../../../context/ConversationProvider"
import List from "../../../../elements/list";

export default () => {

    const { conversations, selectedConversation, setSelectedConversation  } = useConversations() as ConversationContextType;

    return (
        <List>
            { conversations.length === 0 && (
                <List.Item>No Conversations</List.Item>
            )}
            { conversations.map((conversation, index) => (
                <List.Item onClick={() => setSelectedConversation(index)} className={`conversation_list_item${selectedConversation === index ? " selected": ""}`} key={index}>{conversation.recipients.map(r => r.name).join(", ")}</List.Item>
            )) }
        </List>
    )
}