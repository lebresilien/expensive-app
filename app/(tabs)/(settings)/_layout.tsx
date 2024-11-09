import { Stack } from 'expo-router';
import React from 'react';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} />
        </Stack>
    )
}