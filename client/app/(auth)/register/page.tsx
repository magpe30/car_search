"use client";
import { Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const res  = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            });
            res.status === 200 && router.push("/login?success=Account has been created");
        } catch (err: any) {
            setError(err);
        }
    };

    return (
        <div className="mt-4 min-h-screen grow flex items-center justify-around">
        <div>
            <div className="hero__image-overlay" />
            <div className="bg-primary-blue-100 py-5 px-5 rounded-xl">
                <h1 className="text-4xl text-center font-extrabold mb-9">Hey, Hello <span>👋</span></h1>
                <p className="mb-2 text-center">Register your account</p>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input type="text" placeholder="John Doe" required className="register__input"/>
                    <input type="text" placeholder="johnDoe@gmail.com" required className="register__input"/>
                    <input type="password" placeholder="Secret" required className="register__input"/>
                    <Button
                        title='Register'
                        containerStyles='w-full py-[16px] rounded-full bg-[#1769AC] mt-9'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        type="submit"
                    />
                    {error && <p className="mt-3 text-center bg-red-200 py-2 rounded-lg text-red-600">Something went wrong</p>}
                <div className="text-center py-2 text-gray-500 mt-9">
                    Already a member? <Link className="underline text-black" href={'/login'}>Login</Link>
                </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Register;
