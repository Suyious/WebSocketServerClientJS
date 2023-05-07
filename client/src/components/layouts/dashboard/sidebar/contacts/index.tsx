import "./style.css";
import { ContactContextType, useContacts } from "../../../../../context/ContactsProvider"
import List from "../../../../elements/list";

export default () => {

    const { contacts } = useContacts() as ContactContextType;

    return (
        <List>
            { contacts.length === 0 && <List.Item>No Contacts</List.Item>}
            { contacts.map((contact) => (
                <List.Item key={contact.id} >
                    <div className="contact_list_item">
                        { contact.name }
                        <span className="contact_list_item_id">{ contact.id }</span>
                    </div>
                </List.Item>
            ))}
        </List>
    )
}