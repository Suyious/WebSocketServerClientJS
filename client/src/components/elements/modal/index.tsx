import "./style.css";
import { ReactComponent as Close} from "../../../assets/icons/close.svg"

type Position = "top-left" | "top-center" | "top-right" |
                "center-left" | "center" | "center-right" |
                "bottom-left" | "bottom-centre" | "bottom-right"

type ModalProps = {
    children: React.ReactNode,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>> ,
    position?: Position,
}

const Modal = ({ children, setModalOpen, position = "center"}: ModalProps) => {
    return (
        <div className="modal_body">
            <div className="modal_exit" onClick={() => setModalOpen(false)} />
            <div className={"modal_floating " + position}>
                <div className="modal_button_close" onClick={() => setModalOpen(false)}><Close/></div>
                { children }
            </div>
        </div>
    )
}

export default Modal;