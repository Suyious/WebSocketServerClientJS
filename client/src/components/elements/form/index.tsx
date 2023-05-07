import "./style.css"
import Input from "./input"
import Button from "./button"
import CheckBox from "./checkbox"

type FormProps = {
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string,
    variant?: "column" | "row",
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
}

const Form = ({ children, style = {}, className, variant = "column", onSubmit = () => {} }: FormProps) => {

    const styles:React.CSSProperties = {
        gap: "1em",
        ...style
    }

    return (
        <form style={ styles } onSubmit={onSubmit} className={"form_body " + className + " " + variant}>
            {children}
        </form>
    )
}

Form.Input = Input;
Form.CheckBox = CheckBox
Form.Button = Button;

export default Form