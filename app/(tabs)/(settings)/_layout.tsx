import { Stack } from 'expo-router';
import React, { useState } from 'react';

import { GoalContext } from '@/hooks/useGoal';
import { Goal } from '.';

export default function StackLayout() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [current, setCurrent] = useState<Goal | null>(null);

    return (
        <GoalContext.Provider value={{ goals, setGoals, current, setCurrent }}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="details" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} />
                <Stack.Screen name="modal-saving" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} />
            </Stack>
        </GoalContext.Provider>
    )
}