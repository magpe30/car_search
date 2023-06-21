'use client'

import { BookingWidget } from '@/components';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/UserContext';

interface IBookings {
    carMake: string,
    carModel: string,
    checkIn: Date,
    checkOut: Date,
    name: string,
    numberOfDays: number,
    totalPrice: number,
    user: string,
    __v: number,
    _id: number,
}

const ProfilePage = () => {
    const [bookings, setBookings] = useState<IBookings[]>([]);
    const { user, ready } = useAuth();
    const router = useRouter();
    const getBookings = async() => {
        const response = await fetch("http://localhost:4000/bookings", {credentials: "include"});
        const result = await response.json();
        setBookings(result);
    }

    useEffect(() => {
        getBookings();
    }, []);

    if(!ready) {
        return (
            <div className="mt-4 min-h-screen grow flex items-center justify-around">
                <h1 className="font-extrabold text-4xl">Loading...</h1>
            </div>
        )
    }

    if(ready && !user) {
        router?.push("/");
    }



    return (
        
        <div className="mt-4 min-h-screen grow flex items-start justify-around">
        <div>
            <div className="hero__image-overlay object-contain" />
            <div className="bg-primary-blue-100 rounded-xl mt-40 mx-2">
                <div className="profile__card">
                    <div>
                        <h1 className="text-4xl text-center font-extrabold mb-9">Welcome back {user?.name} <span>👋</span></h1>
                        <p className="mb-2 text-center">Check your bookings below</p>
                    </div>
                    <div className="card__overlay"></div>
                </div>
                <div className="mx-auto py-5 px-5 z-5">
                    {
                        bookings.map((booking, index) => {
                            return <BookingWidget {...booking} key={index}/>
                        })
                    }
                <div className="text-center py-2 text-gray-500 mt-9">
                </div>
                </div>
            </div>
        </div>
        </div>
        
    )
};

export default ProfilePage;
