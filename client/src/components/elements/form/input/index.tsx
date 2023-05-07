import { forwardRef } from "react"
import "./style.css"

type InputProp = {
    className?: string,
    style?: React.CSSProperties,
    type?: "text" | "search",
    variant?: "stroke" | "plain",
    placeholder?: string,
    label?: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export default forwardRef((props: InputProp, ref: React.LegacyRef<HTMLInputElement>) => {

    const { className = "", type = "text", value, variant = "stroke", placeholder = "", label = "", style = {}, onChange} = props;

    const styles:React.CSSProperties = {
        ...style
    }

    return (
        <label className={className + " form_input_body " + type + " " + variant} style={styles}>
            <span className="form_input_label">{label}</span>
            <input ref={ref} className="form_input_input" type={type} placeholder={placeholder} value={value} onChange={onChange}/>
        </label>
    )
})