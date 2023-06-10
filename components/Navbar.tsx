import Image from "next/image";
import Link from "next/link";

import { Button } from '@/components';

const Navbar = () => {
    return (
        <header className="w-full absolute z-10">
            <nav className="mx-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-[#E8EEDE]">
                <Link href="/" className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
                </Link>
                <Button title="Sign in" type="button" containerStyles="text-black  min-w-[130px] border-2 border-[#0E63AA] rounded-md" />
            </nav>
        </header>
    )
};

export default Navbar;
