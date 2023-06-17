"use client";
import { Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
    const [error, setError] = useState(null);
    const { setUser, user } = useContext(UserContext);
    
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email =  e.target[0].value;
        const password = e.target[1].value;

        try {
            const res  = await fetch("http://localhost:4000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            });
            const result = await res.json();
            setUser(result);
            router?.push("/profile");
        } catch (err: any) {
            setError(err);
        }
    };

    return (
        <div className="mt-4 min-h-screen grow flex items-center justify-around">
        <div>
            <div className="hero__image-overlay" />
            <div className="bg-primary-blue-100 py-5 px-5 rounded-xl">
                <h1 className="text-4xl text-center font-extrabold mb-9">Hello again <span>👋</span></h1>
                <p className="mb-2 text-center">Login to your account</p>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input type="text" placeholder="johnDoe@gmail.com" required className="register__input"/>
                    <input type="password" placeholder="Secret" required className="register__input"/>
                    <Button
                        title='Login'
                        containerStyles='w-full py-[16px] rounded-full bg-[#1769AC] mt-9'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        type="submit"
                    />
                    {error && <p className="mt-3 text-center bg-red-200 py-2 rounded-lg text-red-600">Something went wrong</p>}
                <div className="text-center py-2 text-gray-500 mt-9">
                    Do not have an account yet? <Link className="underline text-black" href={'/register'}>Register now</Link>
                </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;