import { useEffect } from "react"
import { DeleteIcon, ShareIcon, TwitterIcon, YoutubeIcon } from "./icons"
export interface CardProps {
    type: "twitter" | "youtube",
    title: string,
    link: string
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
    return <div className="max-w-72 min-h-72  bg-white   shadow-md  rounded-md border-gray-200">
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
                    <div className="cursor-pointer text-gray-500"><DeleteIcon /></div>
                </div>
            </div>
            <div className="pt-4 ">
                {props.type === "youtube" && (<iframe width="100%" height="100%" src={props.link.replace("watch?v=", "embed/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>)}
                {props.type === "twitter" &&
                    <div className="overflow-auto">
                        <blockquote className="twitter-tweet">
                            <a href={props.link.replace("x.com", "twitter.com")} title="tweet"></a>
                        </blockquote>
                    </div>
                }
            </div>
        </div>

    </div>
}