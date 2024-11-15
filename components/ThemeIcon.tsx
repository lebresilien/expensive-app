import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export type ThemedIconProps = {
    lightColor?: string;
    darkColor?: string;
    name: React.ComponentProps<typeof Entypo | typeof AntDesign | typeof Ionicons>["name"];
    type?: 'default' | 'ant' | 'ionic',
    size?: number
    onPress?: () => void
};
export const ThemeIcon = ({
    lightColor,
    darkColor,
    name,
    type = 'default',
    size = 17,
    onPress
}: ThemedIconProps) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    return (
        <>
            {type === 'default' && <Entypo size={size} color={color} name={name} onPress={onPress}  /> }
            {type === 'ant' && <AntDesign size={size} color={color} name={name} onPress={onPress} /> }
            {type === 'ionic' && <Ionicons size={size} color={color} name={name} onPress={onPress} /> }
        </>
    );
}
  