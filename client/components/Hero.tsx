"use client";

import { Button } from '@/components';
import Image from "next/image";

const Hero = () => {

    const handleScroll = () => {
        const nextSection = document.getElementById("discover");

        if(nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className="hero__container">
            <div className="hero">
                <div className="flex-1 pt-36 padding-x">
                    <h1 className="hero__title">
                        Book and rent the best car - easily!
                    </h1>

                    <p className="hero__subtitle">
                        Streamline your car rental experience with our effortless booking
                        process.
                    </p>
                    <Button
                        title="Explore Cars"
                        containerStyles="bg-[#EDF2E0] text-black rounded-md mt-10"
                        handleClick={handleScroll}
                    />
                </div>
                <div className="hero__image-container">
                    <div className="hero__image">
                        <Image src="/car-top.png" alt="hero" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Hero;
