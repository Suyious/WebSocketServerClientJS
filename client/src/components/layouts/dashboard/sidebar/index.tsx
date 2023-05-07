import "./style.css"
import Tabs from "../../../elements/tabs"
import Conversations from "./conversations"
import Contacts from "./contacts"
import Modal from "../../../elements/modal"
import NewContact from "../../forms/newcontact"

import { useState } from "react"
import Container from "../../../elements/container"
import Button from "../../../elements/form/button"
import NewConversation from "../../forms/newconversation"

type SidebarProps = {
    id?: string
}

enum selectedState {
    CONVERSATION,
    CONTACT
}

type SelectedPaneProps = {
    selected: selectedState
}

function SelectedPane({selected}: SelectedPaneProps) {
    switch (selected) {
        case selectedState.CONTACT:
            return <Contacts/>
        case selectedState.CONVERSATION:
            return <Conversations/>
    }
}

export default ({ id = "" }: SidebarProps) => {

    const [selected, setSelected] = useState<selectedState>(selectedState.CONVERSATION);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <Tabs className="sidebar_body">
            <Tabs.Options>
                <Tabs.Option onClick={() => setSelected(selectedState.CONVERSATION)} selected={ selected === selectedState.CONVERSATION }>Conversations</Tabs.Option>
                <Tabs.Option onClick={() => setSelected(selectedState.CONTACT)} selected={ selected === selectedState.CONTACT }>Contacts</Tabs.Option>
            </Tabs.Options>
            <Tabs.Content>
                <SelectedPane selected={selected} />
            </Tabs.Content>
            <Container.Flex className="sidebar_bottom_pane"> {id} </Container.Flex>
            <Button className="sidebar_bottom_button" onClick={() => setModalOpen(!modalOpen)}>New {selected === selectedState.CONVERSATION ? "Conversation": "Contact"}</Button> 
            { modalOpen && (
                <Modal setModalOpen={setModalOpen}>
                    { selected === selectedState.CONVERSATION ?
                    <NewConversation closeModal={() => setModalOpen(false)}/>:
                    <NewContact closeModal={() => setModalOpen(false)}/>    
                }
                </Modal>
            )}
        </Tabs>
    )
}