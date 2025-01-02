import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./icons";
import { Input } from "./input";
import axios from "axios";
import { BACKEND_URL } from "../Config";
export enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
}
export function CreateContentModel({ open, onClose}: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>()
    const linkRef = useRef<HTMLInputElement>()
    const [type, setType] = useState(ContentType.Youtube)
    
    
    async function Submit() {
        console.log("working")
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        console.log(title, link)
        if (!title || !link) {
            alert("Please fill in all fields.");
            return;
          }
        try{
            console.log("Sending request with data:", { title, link, type });
            await axios.post(BACKEND_URL + "/api/v1/content", { title, link, type }, {
            headers: {
                token:localStorage.getItem("token")
                
            }
            
        })
        console.log("Sending request with data:", { title, link, type });
        onClose();
    console.log("Request sent successfully.");}
        
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <div>
            {open && (
                <div className="w-screen h-screen  opacity-60 flex justify-center items-center bg-slate-900 fixed top-0 left-0">
                    <div className=" pt-4 pb-4 pr-4 pl-4  fixed border-2 bg-white opacity-100">
                        <div onClick={onClose} className="flex justify-end pb-2 cursor-pointer   ">
                            <CrossIcon />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <Input reference={titleRef} placeholder="Title" />
                            <Input reference={linkRef} placeholder="Link" />
                            <div className="flex gap-10">
                                <Button variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)} text="Youtube" size="sm"></Button>
                                <Button variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)} text="Twitter" size="sm"></Button>
                            </div>
                            <Button onClick={Submit} variant="primary" text="Submit" size="md" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
