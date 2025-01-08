import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/icons";
export const SignUp = () => {
    const EmailRef = useRef<HTMLInputElement>();
    const PasswordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signup() {
        const email = EmailRef.current?.value;
        const password = PasswordRef.current?.value;
        try {
            console.log(BACKEND_URL);
            // await axios.post(BACKEND_URL + "/api/v1/signup", {
            //     email: email,
            //     password: password
            // })
            await fetch(BACKEND_URL + "/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            navigate("/signin");
            alert("Signed Up Successfully")
        }
        catch (error) {
            console.log(error);
        }
    }
    return <div className="w-screen h-screen flex bg-violet-100 justify-center  items-center">
        <div className="flex flex-col py-5 h-96 shadow-lg border-2 border-violet-600 w-72 gap-4 items-center bg-white rounded-2xl ">
            <div className="pt-5 font-bold text-violet-600 flex gap-2 text-2xl">
                <BrainIcon /> Second Brain
            </div>
            <div className="font-bold text-gray-500 text-xl  ">
                Sign up
            </div>
            <div>
                Create an account or
                <a className="text-violet-600" href="/signin"> Sign in</a>
            </div>
            <Input reference={EmailRef} placeholder="Email" />
            <Input reference={PasswordRef} placeholder="Password" />
            <div className="pt-4">
                <Button onClick={signup} variant="primary" text="SignUp" size="md" />
            </div>
        </div>

    </div>
}