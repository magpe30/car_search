"use client"
import { CarProps } from '@/types';
import { calculateRent } from '@/utils';
import { useState } from 'react';

interface CarCardProps {
    car: CarProps,
}

const CarCard = ({car}: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car;

    const [open, setIsOpen] = useState(false);
    
    return (
        <div className="car-card group">
            <div className="car-card content">
                <h2 className="car-card__content-title">
                    {make} {model}
                </h2>
            </div>

            <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
                <span className="self-start text-[14px] leading-[17px] font-semibold">$</span>
                {calculateRent(city_mpg, year)}
                <span className="self-end text-[14px] leading-[17px] font-medium">/day</span>
            </p>
        </div>
    )
};

export default CarCard;