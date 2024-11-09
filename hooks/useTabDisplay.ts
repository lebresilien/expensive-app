import { createContext } from "react";

type ContextProps = {
    display: 'flex' | 'none';
    setDisplay: (display: 'flex' | 'none') => void;
}

export const TabDisplayContext =  createContext<ContextProps>({
    display: 'flex',
    setDisplay: () => null,
});