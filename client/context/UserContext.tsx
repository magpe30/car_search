import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
    ready: false, 
    user: null,
    setUser: (value: any) => {},
});

export function UserContextProvider({ children } : { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if(!user) {
            fetch('http://localhost:4000/api/profile').then(({ data }: any) => {
                setUser(data);
                setReady(true);
            })
        }
    }, []);
    
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}