import { ContactsProvider } from "./ContactsProvider";
import { ConversationProvider } from "./ConversationProvider";
import { SocketProvider } from "./SocketProvider";

type ContextProviderProp = {
    id: string,
    children: React.ReactNode,
}

function ContextProvider({ id, children }: ContextProviderProp) {
    return (
        <SocketProvider id={id}>
            <ContactsProvider id={id}>
                <ConversationProvider id={id}>
                    {children}
                </ConversationProvider>
            </ContactsProvider>
        </SocketProvider>
    )
}

export default ContextProvider;