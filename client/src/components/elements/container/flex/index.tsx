import "./style.css"

type Variant =  "flex-left" | "flex-right" | "flex-top" | "flex-bottom" |
                "space-between" | "center" | "center-horizontal" | "center-vertical";

type FlexProps = {
    className?: string,
    children?: React.ReactNode,
    variant?: Variant,
    style?: React.CSSProperties,
}

function applyVariant(variant: Variant): string {
    switch (variant) {
        case "flex-left":
            return "container_flex_left";
        case "flex-right":
            return "container_flex_right";
        case "flex-top":
            return "container_flex_top";
        case "flex-bottom":
            return "container_flex_bottom";
        case "space-between":
            return "container_spacebetween";
        case "center":
            return "container_centered";
        case "center-vertical":
            return "container_centered_vertically";
        case "center-horizontal":
            return "container_centered_horizontally";
    }
}

export default ({ className="", children, variant = "flex-left", style = {}}: FlexProps) => {

    const styles:React.CSSProperties = {
        gap: "1em",
        ...style
    }

    return (
        <div className={className + " container_flex_body " + applyVariant(variant)} style={styles}>{ children }</div>
    )
}