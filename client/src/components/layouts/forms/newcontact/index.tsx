import "./style.css"
import Form from "../../../elements/form"
import { ContactContextType, useContacts } from "../../../../context/ContactsProvider"
import { useRef } from "react"

type NewContactProps = {
    closeModal: () => void
}

const NewContact = ({ closeModal }: NewContactProps) => {

    const id = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const { createContact } = useContacts() as ContactContextType;

    function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if(id.current && name.current) {
            createContact(id.current.value, name.current.value)
            closeModal();
        }
    }

    return (
        <Form onSubmit={onSubmit} className="new_contact_form_body">
            <h1>New Contact</h1>
            <Form.Input ref={id} label="ID" placeholder="Enter Contact ID"/>
            <Form.Input ref={name} label="Name" placeholder="Enter Contact Name"/>
            <Form.Button type="submit">Add Contact</Form.Button>
        </Form>
    )
}

export default NewContact