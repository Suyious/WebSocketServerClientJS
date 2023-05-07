import "./style.css"
import Item from "./item"

type ListProps = {
    className?: string,
    style?: React.CSSProperties,
    children: React.ReactNode
}

const List = ({ className = "", style = {}, children }: ListProps) => {

    const styles:React.CSSProperties = {
        ...style
    }

    return (
        <ul style={styles} className={className + " list_body"}>
            {children}
        </ul>
    )
}

List.Item = Item;

export default List