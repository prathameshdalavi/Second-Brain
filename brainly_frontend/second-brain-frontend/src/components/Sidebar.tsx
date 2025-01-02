import { BrainIcon, LinksIcon, TwitterIcon, YoutubeIcon } from "./icons"
import { SideBarItem } from "./Sidebaritem"

export const SideBar = () => {
    return <div className="flex flex-col max-w-64 min-w-64 h-screen bg-white border-2 shadow-md">
        <div className=" pl-5 pb-8 pt-5 font-bold text-xl items-center" >
            <SideBarItem icon={<BrainIcon />} text="Second Brain" />
        </div>
        <div className=" flex flex-col pt-5 max-w-56 px-10  gap-6 text-sm">
            <SideBarItem icon={<TwitterIcon />} text="Tweets" />
            <SideBarItem icon={<YoutubeIcon />} text="Videos" />
            <SideBarItem icon={<LinksIcon />} text="Links" />
            <SideBarItem icon={<TwitterIcon />} text="Tweets" />
        </div>
    </div>
}