import "./style.css"

type ButtonProps = {
    className?: string,
    children: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?:  "button" | "submit" | "reset" | undefined,
    disabled?: boolean,
    variant?: "stroke" | "plain" | "fill",
}

export default ({className = "", children, variant = "fill", onClick = () => {}, type = "button", disabled}: ButtonProps) => {
    return (
        <button className={className + " form_button_body " + variant} type={type} onClick={onClick} disabled={disabled}>{ children }</button>
    )
}