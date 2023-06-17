"use client"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface UserProps {
    name?: string,
    email?: string,
    _id?: string,
}

type ReadyType = boolean;
interface UserContextProps {
    user: UserProps,
    ready: boolean,
    setUser: Dispatch<SetStateAction<UserProps>>,
    setReady: Dispatch<SetStateAction<ReadyType>>
}

export const UserContext = createContext<UserContextProps>({
    
}as UserContextProps);

export function UserContextProvider({ children } : { children: React.ReactNode }) {
    const [user, setUser] = useState({} as UserProps);
    const [ready, setReady] = useState(false);

    const getData = async() => {
        const response = await fetch('http://localhost:4000/profile', { credentials: "include" });
        const result = await response.json();
        setUser(result);
        setReady(true);
    }

    useEffect(() => {
        if(JSON.stringify(user) === '{}') {
            getData();
        }
    },[]);
    
    return (
        <UserContext.Provider value={{user, setUser, ready, setReady}}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => useContext(UserContext);