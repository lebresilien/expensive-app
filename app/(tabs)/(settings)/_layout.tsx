import { Stack } from 'expo-router';
import React from 'react';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal'}} />
        </Stack>
    )
}