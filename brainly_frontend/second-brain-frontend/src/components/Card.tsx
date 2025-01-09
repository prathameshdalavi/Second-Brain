import { useEffect } from "react"
import { DeleteIcon, ShareIcon, TwitterIcon, YoutubeIcon } from "./icons"
import axios from "axios";
import { BACKEND_URL } from "../Config";
export interface CardProps {
    type: "twitter" | "youtube",
    title: string,
    link: string,
    contentId: any
}

export const Card = (props: CardProps) => {

    
    useEffect(() => {
        if (props.type === "twitter") {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [props.type]);
    const getYouTubeId = (url: string) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };
    const videoId = props.type === "youtube" ? getYouTubeId(props.link) : null;
    async function deleteContent() {
        try {
            await axios.delete(BACKEND_URL + "/api/v1/content", {
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    contentId: props.contentId
                }
            })
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    }
    return (
        <div className="max-w-96 min-h-72  bg-white break-inside-avoid shadow-md  rounded-md border-gray-200 max-h-fit">
            <div className="pl-5 pr-5 pt-4 ">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="cursor-pointer">
                            {props.type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
                        </div>
                        <div>{props.title}</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="cursor-pointer text-gray-500"><a href={props.link} target="_blank" ><ShareIcon /></a></div>
                        <div onClick={deleteContent} className="cursor-pointer text-gray-500"><DeleteIcon /></div>
                    </div>
                </div>
                <div className="pt-4 ">
                    <div className="pt-4">
                        {props.type === "youtube" && videoId && (
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                                    allowFullScreen
                                    title={props.title}
                                ></iframe>
                            </div>
                        )}

                        {props.type === "twitter" && (
                            <div className="w-full overflow-hidden">
                                <blockquote className="twitter-tweet" style={{ maxWidth: "100%" }}>
                                    <a href={props.link.replace("x.com", "twitter.com")}>View Tweet</a>
                                </blockquote>
                            </div>)}
                    </div>
                </div>

            </div>
        </div>
    )
}