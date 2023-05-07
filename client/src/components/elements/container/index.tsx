import Flex from "./flex"

type ContainerProp = {
    children: React.ReactNode,
}

const Container = ({children}: ContainerProp) => {
    return (
        <>{ children }</>
    )
}

Container.Flex = Flex;

export default Container;