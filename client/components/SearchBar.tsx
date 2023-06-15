'use client'

import { SearchManufacturer } from '@/components';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const SearchButton = ({ extraClasses }: { extraClasses: string }) => {
    return (<button type="submit" className={`-ml-3 z-10 ${extraClasses}`}>
        <Image
            src={"/magnifying-glass.svg"}
            alt={"magnifying-glass"}
            width={40}
            height={40}
            className="object-contain"
        />
    </button>)
}

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        if(manufacturer.trim() === "" && model.trim() === "") {
            return alert("Please provide some input");
        }

        updateSearch(model.toLowerCase(), manufacturer.toLowerCase());
    };

    const updateSearch = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if(model) {
            searchParams.set("model", model);
        } else {
            searchParams.delete("model");
        }

        if(manufacturer) {
            searchParams.set("manufacturer", manufacturer);
        } else {
            searchParams.delete("manufacturer");
        }

        const newPath = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPath);
    }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className="searchbar__item">
                <div className='searchManufacturerContainer'>
                    <SearchManufacturer
                        manufacturer={manufacturer}
                        setManufacturer={setManufacturer}
                    />
                </div>
                <SearchButton extraClasses='sm:hidden' />
            </div>
            <div className='searchbar__item'>
                <Image
                    src='/model-icon.png'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                    alt='car model'
                />
                <input
                    type='text'
                    name='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='Tiguan...'
                    className='searchbar__input'
                />
                <SearchButton extraClasses='sm:hidden' />
            </div>
            <SearchButton extraClasses='max-sm:hidden' />
        </form>
    )
};

export default SearchBar;
