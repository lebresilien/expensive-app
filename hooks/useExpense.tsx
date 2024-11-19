import { Transaction } from "@/app/(tabs)/(dashboard)/index";
import { createContext } from "react";

type ContextProps = {
    expenses: Transaction[];
    incomes: Transaction[];
    setExpenses: (data: Transaction[]) => void;
    setIncomes: (data: Transaction[]) => void;
    totalIncomes: number;
    setTotalIncomes: (value: number) => void;
    totalExpenses: number,
    setTotalExpenses: (value: number) => void;
}

export const ExpenseContext = createContext<ContextProps>({
    expenses: [],
    incomes: [],
    setExpenses: () => null,
    setIncomes: () => null,
    totalIncomes: 0,
    totalExpenses: 0,
    setTotalIncomes: () => null,
    setTotalExpenses: () => null,
});