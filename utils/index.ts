import { FilterProps } from '@/types';

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname;
};

export async function fetchData(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;

    const headers: HeadersInit = {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
            headers: headers,
        }
    );

    const result = await response.json();
    return result;
}

export const calculateRent = (city_mpg: number, year: number) => {
    const basePerDay = 50;  // in dollars per day
    const mileageFactor= 0.1; // additional per 1 mile driven
    const ageFactor = 0.05;

    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalPerDay = basePerDay + mileageRate + ageRate;
    
    return rentalPerDay.toFixed(0);
}