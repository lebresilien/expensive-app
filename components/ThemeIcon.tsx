import { useThemeColor } from "@/hooks/useThemeColor";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from "@expo/vector-icons/Foundation";

export type ThemedIconProps = {
    lightColor?: string;
    darkColor?: string;
    name: React.ComponentProps<typeof Entypo | typeof AntDesign | typeof Ionicons | typeof Foundation>["name"];
    type?: 'default' | 'ant' | 'ionic' | 'found',
    size?: number
    onPress?: () => void,
    color?: string
};
export const ThemeIcon = ({
    lightColor,
    darkColor,
    name,
    type = 'default',
    size = 17,
    onPress,
    color
}: ThemedIconProps) => {
    const colored = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    return (
        <>
            {type === 'default' && <Entypo size={size} color={color ? color : colored} name={name} onPress={onPress}  /> }
            {type === 'ant' && <AntDesign size={size} color={color ? color : colored} name={name} onPress={onPress} /> }
            {type === 'ionic' && <Ionicons size={size} color={color ? color : colored} name={name} onPress={onPress} /> }
            {type === 'found' && <Foundation size={size} color={color ? color : colored} name={name} onPress={onPress} /> }
        </>
    );
}
  