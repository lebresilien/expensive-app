import { Stack } from 'expo-router';
import { Transaction } from '.';
import { useState } from 'react';
import { ExpenseContext } from '@/hooks/useExpense';

export default function StackLayout() {

    const [expenses, setExpenses] = useState<Transaction[]>([]);
    const [incomes, setIncomes] = useState<Transaction[]>([]);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    return (
        <ExpenseContext.Provider value={{ 
            expenses, 
            setExpenses, 
            incomes, 
            setIncomes,
            totalIncomes,
            setTotalIncomes,
            totalExpenses,
            setTotalExpenses
        }}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="transaction" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
            </Stack>
        </ExpenseContext.Provider>
    )
}