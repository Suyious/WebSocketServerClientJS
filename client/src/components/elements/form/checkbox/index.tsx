import { forwardRef } from "react"
import "./style.css"

type InputProp = {
    className?: string,
    label?: string,
    checked?: boolean,
    style?: React.CSSProperties,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export default forwardRef((props: InputProp, ref: React.LegacyRef<HTMLInputElement>) => {

    const { className = "", label, value, checked, style = {}, onChange = () => {}} = props;

    const styles:React.CSSProperties = {
        ...style
    }

    return (
        <label className={className + " form_checkbox_body"} style={styles}>
            <span className="form_checkbox_label">{label}</span>
            <input ref={ref} value={value || label} checked={checked} type="checkbox" className="form_checkbox_input" onChange={onChange}/>
        </label>
    )
})