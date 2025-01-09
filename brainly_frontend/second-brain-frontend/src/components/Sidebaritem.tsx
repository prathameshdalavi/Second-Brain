import { ReactElement } from "react"
interface  SideBarItemProps{
    icon:ReactElement,
    text:string
}
export const SideBarItem=(props:SideBarItemProps)=>{
    return <div className="flex gap-2 items-center">
        {props.icon}
        {props.text}
    </div>
}