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
export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>()
    const linkRef = useRef<HTMLInputElement>()
    const [type, setType] = useState(ContentType.Youtube)


    async function Submit() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        if (!title || !link) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            console.log("Sending request with data:", { title, link, type });
            await axios.post(BACKEND_URL + "/api/v1/content", { title, link, type }, {
                headers: {
                    token: localStorage.getItem("token")

                }
            })
            console.log("Sending request with data:", { title, link, type });
            onClose();
            console.log("Request sent successfully.");
        }

        catch (error) {
            console.log(error);
        }
    }

    if (!open) {
        return null;
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 z-50">
            <div className="fixed inset-0 bg-gray-500 opacity-60" onClick={onClose}>
            </div>
            <div className="relative shadow-2xl bg-white border-2 border-blue-200 h-72 rounded-md p-1 shadow-md z-10 w-96">
                <div onClick={onClose} className="flex justify-end pb-2 cursor-pointer ">
                    <CrossIcon />
                </div>
                <div className="flex flex-col gap-4 pt-4  items-center">
                    <Input reference={titleRef} placeholder="Title" />
                    <Input reference={linkRef} placeholder="Link" />
                    <div className="flex  pt-2 gap-2">
                        Select Type :-
                        <Button variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)} text="Youtube" size="sm"></Button>
                        <Button variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)} text="Twitter" size="sm"></Button>
                    </div >
                    <div className="pt-3">
                    <Button onClick={Submit} variant="primary" text="Submit" size="md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
