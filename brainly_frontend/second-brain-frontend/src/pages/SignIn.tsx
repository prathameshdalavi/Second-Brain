import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../Config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const SignIn=()=>{
        const EmailRef=useRef<HTMLInputElement>();
        const PasswordRef = useRef<HTMLInputElement>();
        const navigate = useNavigate();
        async function signin() {
            const email = EmailRef.current?.value;
            const password = PasswordRef.current?.value;
        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                email: email,
                password: password
            });
            const jwtToken = response.data.token;
            localStorage.setItem("token", jwtToken);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }
    return <div className="w-screen h-screen flex bg-gray-200 justify-center items-center">
        <div className="flex flex-col py-5 w-72 gap-4 items-center bg-white rounded-md ">
            <Input reference={EmailRef} placeholder="Email" />
            <Input reference={PasswordRef} placeholder="Password" />
            <div className="pt-4">
                <Button onClick={signin} variant="primary" text="SignIn" size="md"/>
            </div>
        </div>

    </div>
}