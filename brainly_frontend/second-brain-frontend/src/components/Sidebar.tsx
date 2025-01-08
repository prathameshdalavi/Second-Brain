import { BrainIcon, LinksIcon, TwitterIcon, YoutubeIcon } from "./icons"
import { SideBarItem } from "./Sidebaritem"

export const SideBar = () => {
    return (
        <>
            <div className="flex flex-col w-0 sm:w-32 md:w-48 lg:w-64 h-full bg-white border-2 shadow-md fixed left-0 top-0">
                <div className=" flex pt-5 justify-center font-bold text-2xl items-center" >
                    <SideBarItem icon={<BrainIcon />} text="Second Brain" />
                </div>
                <div className=" flex flex-col items-center pt-10 pr-7  gap-20 text-sm">
                    <SideBarItem icon={<TwitterIcon />} text="Tweets" />
                    <SideBarItem icon={<YoutubeIcon />} text="Videos" />
                    <SideBarItem icon={<LinksIcon />} text="Links" />
                    <SideBarItem icon={<TwitterIcon />} text="Tweets" />
                </div>
            </div>
            <div className="w-0 sm:w-32 md:w-48 lg:w-64 h-full"></div>
        </>
    )
}