import { createContext } from "react";

export type Category = {
    id: number
    name: string
}

export type User = {
    name: string
    email: string
}

type ContextProps = {
    userData: User | null
    setUserData: (userData: User | null) => void
    expensiveCategories: Category[]
    incomeCategories: Category[]
    setExpensiveCategories: (data: Category[]) => void
    setIncomeCategories: (data: Category[]) => void
}


export const UserContext =  createContext<ContextProps>({
    userData: null,
    setUserData: () => null,
    expensiveCategories: [],
    incomeCategories: [],
    setExpensiveCategories: () => null,
    setIncomeCategories: () => null
});



