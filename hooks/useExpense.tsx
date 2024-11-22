import { Month } from "@/app/(tabs)/(dashboard)/_layout";
import { Transaction } from "@/app/(tabs)/(dashboard)/index";
import { createContext } from "react";

type ContextProps = {
    expenses: Transaction[];
    incomes: Transaction[];
    months: Month[];
    startMonth: string,
    endMonth: string,
    setExpenses: (data: Transaction[]) => void;
    setIncomes: (data: Transaction[]) => void;
    setMonths: (data: Month[]) => void;
    totalIncomes: number;
    setTotalIncomes: (value: number) => void;
    totalExpenses: number,
    setTotalExpenses: (value: number) => void;
    setStartMonth: (value: string) => void;
    setEndMonth: (value: string) => void;
}

export const ExpenseContext = createContext<ContextProps>({
    expenses: [],
    incomes: [],
    months: [],
    startMonth: '',
    endMonth: '',
    setExpenses: () => null,
    setIncomes: () => null,
    totalIncomes: 0,
    totalExpenses: 0,
    setTotalIncomes: () => null,
    setTotalExpenses: () => null,
    setMonths: () => null,
    setStartMonth: () => null,
    setEndMonth: () => null,
});