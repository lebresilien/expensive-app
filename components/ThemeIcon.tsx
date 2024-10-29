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
    onPress?: () => void
};
export const ThemeIcon = ({
    lightColor,
    darkColor,
    name,
    type = 'default',
    onPress
}: ThemedIconProps) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    return (
        <>
            {type === 'default' && <Entypo size={17} color={color} name={name} onPress={onPress}  /> }
            {type === 'ant' && <AntDesign size={17} color={color} name={name} onPress={onPress} /> }
            {type === 'ionic' && <Ionicons size={17} color={color} name={name} onPress={onPress} /> }
        </>
    );
}
  