import { ReactElement } from "react"

interface ButtonProps {
    variant: "primary" | "secondary",
    text: string,
    size: "sm" | "md" | "lg",
    starticon?: ReactElement,
    onClick?: () => void,
}
const sizeClasses =  {
    sm: "px-2 py-1 text-sm rounded-md",
    md: "px-4 py-2 text-md rounded-md",
    lg: "px-8 py-4 text-lg rounded-md"
}
const variantClasses = {
    primary: "bg-purple-600 text-white flex text-center items-center gap-1",
    secondary: "bg-blue-100 text-purple-600 flex text-center items-center gap-2 "
}



export const Button = (propsButton: ButtonProps) => {
    return <div>
        <button onClick={propsButton.onClick} className={`${sizeClasses[propsButton.size]} ${variantClasses[propsButton.variant]}`}>{propsButton.starticon}{propsButton.text}</button>
    </div>
}