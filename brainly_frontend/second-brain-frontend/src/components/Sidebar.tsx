import { BrainIcon, TwitterIcon, YoutubeIcon } from "./icons"
import { SideBarItem } from "./Sidebaritem"
export const SideBar = ({ setType }: { setType: (type: string) => void }) => {
    return (
        <>
            <div className="md:flex flex-col hidden sm:w-32 md:w-48 lg:w-64 trasition-all duration-500  h-full bg-white border-2 shadow-md fixed left-0 top-0  ">
                <div onClick={() => setType("all")} className="flex pt-5 justify-center sm:text-sm md:text-md lg:text-xl xl:text-2xl  transition-all duration-500 font-bold items-center cursor-pointer" >
                    <SideBarItem icon={<BrainIcon/>} text="Second Brain" />
                </div>
                <div className="flex flex-col text-gray-800   sm:text-xs md:text-sm lg:text-md xl:text-lg px-4  transition-all duration-500  items-center pt-32 gap-20">
                    <button onClick={() => setType("youtube")}><SideBarItem icon={<YoutubeIcon />} text="Youtube" /></button>
                    <button onClick={() => setType("twitter")}><SideBarItem icon={<TwitterIcon />} text="Twitter" /></button>
                </div>
            </div>
            <div className="hidden md:flex md:w-48 lg:w-64 h-full"></div>
        </>
    )
}