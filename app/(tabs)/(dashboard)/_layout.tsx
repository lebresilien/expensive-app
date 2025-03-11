import { Stack } from 'expo-router';
import { Transaction } from '.';
import { useState } from 'react';
import { ExpenseContext, Trx } from '@/hooks/useExpense';

export type Month = {
    startMonth: string
    endMonth: string
}
export default function StackLayout() {

    const [expense, setExpense] = useState<Trx[]>([]);
    const [income, setIncome] = useState<Trx[]>([]);
    const [months, setMonths] = useState<Month[]>([]);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');

    return (
        <ExpenseContext.Provider value={{ 
            expense, 
            setExpense, 
            income, 
            setIncome,
            totalIncomes,
            setTotalIncomes,
            totalExpenses,
            setTotalExpenses,
            months,
            setMonths,
            startMonth,
            endMonth,
            setStartMonth,
            setEndMonth
        }}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="semi-modal" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
                <Stack.Screen name="transaction" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
                <Stack.Screen name="filter" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
            </Stack>
        </ExpenseContext.Provider>
    )
}