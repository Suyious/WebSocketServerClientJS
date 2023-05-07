import "./style.css"
import Container from "../../../../elements/container";
import { forwardRef } from "react";

type MessageProps = {
    className?: string,
    children: React.ReactNode,
    outgoing?: boolean
}

const Message = forwardRef(({ className = "", children, outgoing = false }: MessageProps, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
        <Container.Flex
            variant={outgoing ? "flex-right": "flex-left"}
            className={className + " message_message_body " + (outgoing ? "outgoing" : "")}
        >
            <div className="message_message_bubble">
                { children }
            { ref && <div className="message_message_scroll_offset" ref={ref}/> }
            </div>
        </Container.Flex>
    )
})

export default Message;