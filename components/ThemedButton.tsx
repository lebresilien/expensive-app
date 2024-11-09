import { StyleSheet, PressableProps, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

export type ThemedButtonProps = PressableProps & {
    title: string;
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'cancel';
    isValid?: boolean
  };

export default function ThemedButton({
    style,
    title,
    lightColor,
    darkColor,
    type = 'default',
    isValid,
    ...rest
}: ThemedButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    const background = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');

    return (
        <Pressable
            style={[
                type === 'cancel' ? styles.button : undefined,
            ]}
            {...rest}
        >
            <ThemedText type='button'>{title}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent'
    }
});