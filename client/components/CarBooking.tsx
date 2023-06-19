"use client"
import { Button } from '@/components';
import { CarProps } from '@/types';
import { Dialog, Transition } from "@headlessui/react";
import { differenceInCalendarDays } from "date-fns";
import Image from 'next/image';
import { Fragment, useState } from 'react';

interface CarBookingProps {
    isOpen: boolean,
    closeModal: () => void,
    car: CarProps,
    price: string,
}

const CarBooking = ({ isOpen, closeModal, car, price}: CarBookingProps) => {
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');

    let numberOfDays = 0;
    let totalPrice = 0;

    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

        totalPrice = numberOfDays * Number(price);
    }
    
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-out duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2x1 bg-white p-6 text-left shadow-x1 transition-all flex flex-col gap-5">
                                <button type="button" className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full" onClick={closeModal}>
                                    <Image src="/close.svg" alt="close" width={20} height={20} className="object-contain" />
                                </button>
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center pounded-lg">
                                        <Image src="/car-front.png" alt="car model" fill priority className="object-contain" />
                                    </div>
                                </div>
                                <div className='flex-1 flex flex-col gap-2'>
                                    <h2 className='font-semibold text-xl capitalize'>
                                        {car.make} {car.model}
                                    </h2>
                                    <div className='mt-2 flex flex-wrap gap-4'>
                                        <p className="flex mt-2 text-[32px] leading-[38px] font-extrabold">
                                            <span className="self-start text-[14px] leading-[17px] font-semibold">$</span>
                                                {price}
                                            <span className="self-end text-[14px] leading-[17px] font-medium">/day</span>
                                        </p>
                                    </div>
                                    <div className="py-3">
                                        <label className="mx-2">Start day:</label>
                                        <input type="date"
                                            value={checkIn}
                                            onChange={ev => setCheckIn(ev.target.value)}/>
                                    </div>
                                    <div className="py-3">
                                        <label className="mx-2">End day:</label>
                                        <input type="date" value={checkOut}
                                            onChange={ev => setCheckOut(ev.target.value)}/>
                                    </div>
                                    <div className="py-3">
                                        <label>Your full name:</label>
                                        <input type="text"
                                            value={name}
                                            onChange={ev => setName(ev.target.value)}
                                            className="register__input"
                                        />
                                    </div>
                                    <div className="py-3">
                                        <label>Phone number:</label>
                                        <input type="tel"
                                            value={phone}
                                            onChange={ev => setPhone(ev.target.value)}
                                            className="register__input"
                                        />
                                    </div>
                                    <div className="py-3">
                                        <p className="flex text-[20px] leading-[16px] font-extrabold">
                                            Total Days: <span className="text-[20px] mx-2">{numberOfDays}</span>
                                        </p>
                                        <p className="flex mt-6 text-[20px] leading-[38px] font-extrabold">
                                            <span className="text-[35px] mx-2">${totalPrice}</span>
                                        </p>
                                        
                                    </div>
                                </div>
                                <Button
                                    title='Complete booking'
                                    containerStyles='w-full py-[16px] rounded-full bg-[#1769AC]'
                                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                                    rightIcon='/right-arrow.svg'
                                    handleClick={() => console.log("booking here")}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
};

export default CarBooking;