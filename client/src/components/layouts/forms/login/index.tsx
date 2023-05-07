import Form from "../../../elements/form"
import Container from "../../../elements/container"
import { useRef } from "react"
import { v4 as uuid } from 'uuid'

type LoginProps = {
    setId: React.Dispatch<React.SetStateAction<string | null>>
}

export default ({ setId }: LoginProps) => {

    const input = useRef<HTMLInputElement>(null)

    function onLoginSubmit(e: React.SyntheticEvent) {
        e.preventDefault()

        if(input.current){
            setId(input.current.value);
        }
    }

    function generateID() {
        setId(uuid());
    }

    
    return (
        <Form onSubmit={onLoginSubmit} className="login_form_body">
            <Form.Input ref={input} type="text" placeholder="Enter Your ID" label="ID"/>
            <Container.Flex variant="flex-left" style={{ gap: "0.5em"}}>
                <Form.Button type="submit">Login</Form.Button>
                <Form.Button onClick={generateID}>Create a New ID</Form.Button>
            </Container.Flex>
        </Form>
    )
}