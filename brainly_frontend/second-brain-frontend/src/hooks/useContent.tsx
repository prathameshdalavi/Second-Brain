import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../Config";

export function useContent() {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const refresh = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found. Skipping API call.");
            return;
        }

        setIsLoading(true);
        axios
            .get(`${BACKEND_URL}/api/v1/content`, {
                headers: { token },
            })
            .then((response) => {
                setContent(response.data.data);
                setError(null); // Clear previous errors
            })
            .catch((err) => {
                console.error("Error fetching content:", err);
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        refresh(); // Fetch initially

        const interval = setInterval(() => {
            refresh(); // Refresh periodically
        }, 10 * 1000);

        return () => {
            clearInterval(interval); // Cleanup on unmount
        };
    }, []);

    return { content, refresh, isLoading, error };
}
