import { Stack } from 'expo-router';
import { Transaction } from '.';
import { useState } from 'react';
import { ExpenseContext } from '@/hooks/useExpense';

export type Month = {
    startMonth: string
    endMonth: string
}
export default function StackLayout() {

    const [expenses, setExpenses] = useState<Transaction[]>([]);
    const [incomes, setIncomes] = useState<Transaction[]>([]);
    const [months, setMonths] = useState<Month[]>([]);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');

    return (
        <ExpenseContext.Provider value={{ 
            expenses, 
            setExpenses, 
            incomes, 
            setIncomes,
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