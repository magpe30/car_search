"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from '@/components';
import { useAuth } from '../context/UserContext';

const Navbar = () => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    
    const handleLogout = async() => {
        const res  = await fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include"
        });
         const result  = await res.json();
        
        if(result) {
            setUser({});
            router.push("/");
        }
    }

    return (
        <header className="w-full absolute z-10">
            <nav className="mx-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
                <Link href="/" className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
                </Link>
                {
                    !user ?
                    <Link href="/register">
                        <Button title="Sign in" type="button" containerStyles="text-black  min-w-[130px] border-2 border-[#0E63AA] rounded-md" />
                    </Link>
                    :
                    <Button title="Log out" type="button" handleClick={handleLogout} containerStyles="text-black  min-w-[130px] border-2 border-[#0E63AA] rounded-md" />
                }
            </nav>
        </header>
    )
};

export default Navbar;
