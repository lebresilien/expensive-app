import { Month } from "@/app/(tabs)/(dashboard)/_layout";
import { Transaction } from "@/app/(tabs)/(dashboard)/index";
import { createContext } from "react";

export type Trx = {
    id: number
    name: string
    amount: number
}

type ContextProps = {
    expense: Trx[];
    income: Trx[];
    months: Month[];
    startMonth: string,
    endMonth: string,
    setMonths: (data: Month[]) => void;
    setIncome: (data: Trx[]) => void;
    setExpense: (data: Trx[]) => void;
    totalIncomes: number;
    setTotalIncomes: (value: number) => void;
    totalExpenses: number,
    setTotalExpenses: (value: number) => void;
    setStartMonth: (value: string) => void;
    setEndMonth: (value: string) => void;
}

export const ExpenseContext = createContext<ContextProps>({
    expense: [],
    income: [],
    months: [],
    startMonth: '',
    endMonth: '',
    //setExpenses: () => null,
    //setIncomes: () => null,
    totalIncomes: 0,
    totalExpenses: 0,
    setTotalIncomes: () => null,
    setTotalExpenses: () => null,
    setMonths: () => null,
    setStartMonth: () => null,
    setEndMonth: () => null,
    setExpense: () => null,
    setIncome: () => null,
});