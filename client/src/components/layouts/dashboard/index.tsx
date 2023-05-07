import ContextProvider from "../../../context"
import Container from "../../elements/container"
import Messages from "./messages"
import Sidebar from "./sidebar"

type DashboardProps = {
    id: string
}

export default ({ id }: DashboardProps) => {

    return (
        <ContextProvider id={id}>
            <Container.Flex variant="flex-left">
                <Sidebar id={id}/>
                <Messages id={id}/>
            </Container.Flex>
        </ContextProvider>
    )
}