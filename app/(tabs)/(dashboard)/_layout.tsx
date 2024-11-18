import { Stack } from 'expo-router';

export default function StackLayout() {

    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="transaction" options={{ presentation: 'modal', animation: 'slide_from_bottom'}} getId={() => String(Date.now())} />
        </Stack>
    )
}