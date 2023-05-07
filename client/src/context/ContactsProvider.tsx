import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface Contact {
    id: string,
    name: string
}

type ContactProviderArgs = {
    id: string,
    children: React.ReactNode
}

export type ContactContextType = {
    contacts: Contact[],
    createContact: (id: string, name: string) => void,
}

const ContactContext = createContext<ContactContextType | null>(null)

export function useContacts() {
    return useContext(ContactContext);
}

export function ContactsProvider({ id, children }: ContactProviderArgs) {

    const [ contacts, setContacts ] = useLocalStorage<Contact[]>(`contacts-${id}`, []);

    function createContact( id: string, name: string) {
        setContacts( prev => {
            return [ ...prev, { id, name }]
        })
    }

    return (
        <ContactContext.Provider value={{ contacts, createContact }}>{ children }</ContactContext.Provider>
    )
}