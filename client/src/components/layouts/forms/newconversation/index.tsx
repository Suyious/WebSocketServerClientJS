import "./style.css"
import { useState } from "react";
import Form from "../../../elements/form";
import { ContactContextType, useContacts } from "../../../../context/ContactsProvider";
import { ConversationContextType, useConversations } from "../../../../context/ConversationProvider";

type NewConversationProps = {
    closeModal: () => void
}

const NewConversation = ({ closeModal }: NewConversationProps) => {

    const [ contactIDs, setContactIDs ] = useState<string[]>([]);
    const { contacts } = useContacts() as ContactContextType;
    const { createConversations } = useConversations() as ConversationContextType;

    function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        createConversations(contactIDs);
        closeModal();
    }

    function onChange(contactID: string) {
        setContactIDs( prevIDs => {
            if(prevIDs.includes(contactID)){
                return prevIDs.filter(prevID => {
                    return contactID !== prevID;
                })
            } else {
                return [...prevIDs, contactID];
            }
        })
    }

    return (
        <Form className="new_conversation_body" onSubmit={onSubmit}>
            { contacts.length === 0 ? (
                <>
                    <div>No Contacts</div>
                </>
            ): ( <>
                { contacts.map(contact => (
                    <Form.CheckBox key={contact.id} label={contact.name} checked={contactIDs.includes(contact.id)} onChange={() => onChange(contact.id)}/>
                )) }
                <Form.Button type="submit">Create</Form.Button>
            </>)}
        </Form>
    )
}

export default NewConversation;