import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeIcon } from "@/components/ThemeIcon";
import { UserContext } from "@/hooks/userContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useContext } from "react";
import { Image, SafeAreaView, StyleSheet, TouchableHighlight } from "react-native";

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

export default function ProfileScreen({ lightColor, darkColor}: ThemedTextProps) {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
    const { userData } = useContext(UserContext);
    
    const myProfile = [
        {
            name: 'userData?.name',
            type: 'name'
        },
        {
            name: 'java',
            type: 'free'   
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
            
            <ThemedView style={[styles.header, { backgroundColor }]}>
                <ThemeIcon name='arrow-back-outline' type='ionic' color={color} onPress={() =>{}} />
                <ThemedText type="link" style={{color}}>Profile</ThemedText>
                <ThemedText type="link"></ThemedText>
            </ThemedView>

            <ThemedView style={styles.avatar}>
                <Image source={require("@/assets/images/contact.png")} style={styles.logo} />
                <TouchableHighlight>
                    <ThemedText type="link" style={{color: backgroundColor}}>Ajouter une photo</ThemedText>
                </TouchableHighlight>
            </ThemedView>

            <ThemedView style={styles.content}>
                <ThemedView style={styles.account}>
                    {myProfile.map((item, index) => (
                        <ThemedView style={styles.row} key={index}>
                            <ThemedText type="link">{item.type}</ThemedText>
                            <ThemedView style={styles.rowContent}>
                                <ThemedText type="link">{item.name}</ThemedText>
                                <ThemeIcon name="chevron-forward" type="ionic" />
                            </ThemedView>
                        </ThemedView>
                    ))}
                </ThemedView>
            </ThemedView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      rowGap: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    white: {
        color: 'white'
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 10,
    },
    logo: {
        height: 80,
        width: 80
    },
    content: {
        rowGap: 20,
        paddingHorizontal: 10
    },
    account: {
        backgroundColor: 'white',
        padding: 5
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    rowContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});