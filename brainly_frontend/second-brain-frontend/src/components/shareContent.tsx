import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../Config";
import { CrossIcon } from "./icons";

interface ShareContentProps {
    onCloseShare: () => void;
    open: boolean;
}

export function ShareContent({ onCloseShare, open }: ShareContentProps) {
    const [shareLink, setShareLink] = useState<string | null>(null);
    const shareRef = useRef<HTMLInputElement>(null);

    const handleShare = async () => {
        try {
            const shareResponse = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { shareLink: "true" },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (shareResponse.data.hash) {
                setShareLink(`${window.location.origin}/share/${shareResponse.data.hash}`);
                alert("Brain shared successfully!");
            } else {
                alert("Failed to create shareable link.");
            }
        } catch (error) {
            console.error("Error sharing brain:", error);
            alert("Failed to share brain. Please try again.");
        }
    };

    const handleDisableShare = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { shareLink: "false" },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.data.message) {
                setShareLink(null);
                alert("Shareable link disabled successfully!");
            }
        } catch (error) {
            console.error("Error disabling share link:", error);
            alert("Failed to disable share link.");
        }
    };

    const copyToClipboard = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            alert("Link copied to clipboard!");
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 z-50">
            <div className="fixed inset-0 bg-gray-500 opacity-60" onClick={onCloseShare}></div>
            <div className="relative shadow-2xl bg-gray-200 border-2  border-blue-200 h-32 rounded-md p-2 shadow-md z-10 w-96">
                <div onClick={onCloseShare} className="flex justify-end pb-4 cursor-pointer">
                    <CrossIcon />
                </div>
                <div >
                    {shareLink ? (
                        <div >
                            <input
                                ref={shareRef}
                                value={shareLink}
                                placeholder="Share link"
                                type="text"
                                readOnly
                                onClick={copyToClipboard}
                                title="Click to copy to clipboard"
                                className="w-full px-4 py-2 border rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                            />
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className=" bg-blue-500 text-sm text-white px-2 py-1 mt-1 items-center  rounded-2xl"
                                >
                                    Copy Link
                                </button>
                                <button
                                    onClick={handleDisableShare}
                                    className="bg-red-500 text-sm rounded-2xl px-2 py-1 mt-1  items-center text-white rounded"
                                >
                                    Disable Share
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleShare}
                            className="p-2 bg-green-500 text-white rounded w-full"
                        >
                            Generate Shareable Link
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
