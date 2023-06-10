'use client'

import { SearchManufacturer } from '@/components';
import Image from 'next/image';
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

    const handleSubmit = () => {
        console.log("hey");
    }

    return (
        <form className='searchbar' onSubmit={handleSubmit}>
            <div className="searchbar__item">
                <div className='searchManufacturerContainer'>
                    <SearchManufacturer
                        manufacturer={manufacturer}
                        setManuFacturer={setManufacturer}
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
