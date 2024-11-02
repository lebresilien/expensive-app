import { createContext } from "react";

export type User = {
    name: string
    email: string
}

type ContextProps = {
    userData: User | null;
    setUserData: (userData: User | null) => void;
}


export const UserContext =  createContext<ContextProps>({
    userData: null,
    setUserData: () => null,
});



