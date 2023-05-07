import "./style.css"

type ListItemProps = {
    className?: string,
    style?: React.CSSProperties,
    children: React.ReactNode,
    onClick?: () => void
}

export default ({ className = "", style = {}, children, onClick = () => {} }: ListItemProps) => {

    const styles:React.CSSProperties = {
        ...style
    }

    return (
        <li className={ className + " list_item_body"} onClick={onClick}>{ children }</li>
    )
}