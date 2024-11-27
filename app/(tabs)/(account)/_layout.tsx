import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {

    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
        </Stack>
    )
}