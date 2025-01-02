import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const SignUp = () => {
    const UsernameRef = useRef<HTMLInputElement>();
    const EmailRef = useRef<HTMLInputElement>();
    const PasswordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signup() {
        const username = UsernameRef.current?.value;
        const email = EmailRef.current?.value;
        const password = PasswordRef.current?.value;
        axios.post(BACKEND_URL + "/api/v1/signup", {
            userName: username,
            email: email,
            password: password
        })
        navigate("/signin");
    alert("Signed Up Successfully")
    }
    return <div className="w-screen h-screen flex bg-gray-200 justify-center items-center">
        <div className="flex flex-col py-5 w-72 gap-4 items-center bg-white rounded-md ">
            <Input reference={UsernameRef} placeholder="Username" />
            <Input reference={EmailRef} placeholder="Email" />
            <Input reference={PasswordRef} placeholder="Password" />
            <div className="pt-4">
                <Button onClick={signup}  variant="primary" text="SignUp" size="md" />
            </div>
        </div>

    </div>
}