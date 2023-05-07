import "./style.css"
import Container from "../container"

type TabsProps = {
    className?: string,
    children: React.ReactNode,
}

const Tabs = ({ className = "", children }: TabsProps) => {
    return (
        <Container.Flex variant="flex-top" className={className + " tabs_body"}>
            {children}
        </Container.Flex>
    )
}

type TabOptionsProps = {
    className?: string,
    children: React.ReactNode,
}

Tabs.Options = ({className = "", children}: TabOptionsProps) => {
    return (
        <ul className={className + " tabs_options_body flex"}>
            {children}
        </ul>
    )
}

type TabsOptionProps = {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLLIElement> 
    children: React.ReactNode,
    selected?: boolean,
}

Tabs.Option = ({className = "", onClick = () => {}, children, selected = false}: TabsOptionProps) => {
    return (
        <li onClick={onClick} className={className + " tabs_option_body " + ( selected ? "select": "" )}>{children}</li>
    )
}

type TabContentProps = {
    children: React.ReactNode,
}

Tabs.Content = ({children}: TabContentProps) => {
    return (
        <div className="tabs_content_body">{children}</div>
    )
}

export default Tabs