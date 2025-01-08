import { ReactElement } from "react"
interface  SideBarItemProps{
    icon:ReactElement,
    text:string
}
export const SideBarItem=(props:SideBarItemProps)=>{
    return <div className="flex text-gray-800 cursor-pointer  justify-center  transition-all duration-500 hover:bg-gray-200  items-center gap-2">
        {props.icon}
        {props.text}
    </div>
}