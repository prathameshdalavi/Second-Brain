import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../Config";
export function useContent() {
    const [content, setContent] = useState([]);
    function refresh() {
        axios.get(BACKEND_URL + "/api/v1/content", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((response) => { setContent(response.data.data) })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000);
        return () => {
            clearInterval(interval); 
        };
    }, []);
    return { content, refresh };

}