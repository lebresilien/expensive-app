import { Stack } from 'expo-router';
import React, { useState } from 'react';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GoalContext } from '@/hooks/useGoal';
import { Goal } from '.';

export default function StackLayout() {
    const colorScheme = useColorScheme();
    const [goals, setGoals] = useState<Goal[]>([]);

    return (
        <GoalContext.Provider value={{ goals, setGoals }}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="modal" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} />
            </Stack>
        </GoalContext.Provider>
    )
}