import { format } from "date-fns";
import Image from 'next/image';

type Booking = {
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

const BookingWidget = (booking: Booking) => {
    
    return (
        <div className="bg-[#242A48] rounded-md md:min-w-[650px] mb-6">
            <div className="py-2 px-2 flex flex-col justify-between md:flex-row">
                <div className="relative w-full h-40 bg-pattern bg-cover bg-center pounded-lg">
                    <Image src="/car-front.png" alt="car model" fill priority className="object-contain" />
                </div>
                <div className="text-white flex justify-end py-6 px-6 md:min-w-[350px]">
                    <div>
                        <h1 className="text-[25px] font-extrabold">{booking?.carMake} {booking?.carModel}</h1>
                        <h1 className="mb-6">{booking?.name}</h1>
                        <div className="flex flex-wrap gap-y-1">
                            <p className="mr-3">{format(new Date(booking?.checkIn), 'yyyy-MM-dd')}</p>
                            <p className="mr-3"><span className="font-extrabold">Total days:</span>{booking?.numberOfDays}</p>
                            <p><span className="font-extrabold">Total:</span> ${booking?.totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingWidget;
