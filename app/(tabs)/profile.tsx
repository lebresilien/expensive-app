import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeIcon } from "@/components/ThemeIcon";
import { UserContext } from "@/hooks/userContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useContext } from "react";
import { Image, SafeAreaView, StyleSheet, TouchableHighlight } from "react-native";
import api from "../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

export default function ProfileScreen({ lightColor, darkColor}: ThemedTextProps) {

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
    const { userData, setUserData } = useContext(UserContext);
    
    const router = useRouter();
    
    const myProfile = [
        {
            name: userData?.name,
            type: 'name'
        },
        {
            name: 'changer de plan',
            type: 'free'   
        }
    ];

    const data = [
        {
            name: userData?.email,
            type: 'email'
        },
        {
            name: 'non defini',
            type: 'sexe'   
        },
        {
            name: 'non defini',
            type: 'date naissance'   
        }
    ];

    const logout = () => {
        api.post('logout')
        .then(async () => {

            const keys = ['@token', '@name', '@email'];

            try {
                await AsyncStorage.multiRemove(keys);
                setUserData(null);
                router.replace('/login');
            }
            catch(e) {
                alert('error during removing storage');
            }
    
        })
        .catch((err) => alert(err.response.data.message))
    }

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
                        <ThemedView 
                            key={index}
                            style={[
                                styles.row,
                                (index + 1) < myProfile.length && { borderBottomWidth: 1, borderStyle: 'dashed',  borderColor: "#a3a3a3"}
                            ]}
                        >
                            <ThemedText type="link" style={styles.zinColor}>{item.type}</ThemedText>
                            <ThemedView style={styles.rowContent}>
                                <ThemedText type="link" style={styles.zinColor}>{item.name}</ThemedText>
                                <ThemeIcon name="chevron-forward" type="ionic" color="#a3a3a3" />
                            </ThemedView>
                        </ThemedView>
                    ))}
                </ThemedView>

                <ThemedText type="subtitle" style={{color: '#000'}}>Informations personnelles</ThemedText>

                <ThemedView style={styles.account}>
                    {data.map((item, index) => (
                        <ThemedView 
                            key={index}
                            style={[
                                styles.row,
                                (index + 1) < data.length && { borderBottomWidth: 1, borderStyle: 'dashed',  borderColor: "#a3a3a3"}
                            ]}
                        >
                            <ThemedText type="link" style={styles.zinColor}>{item.type}</ThemedText>
                            <ThemedView style={styles.rowContent}>
                                <ThemedText type="link" style={[styles.zinColor, { textTransform: 'lowercase' }]}>{item.name}</ThemedText>
                                <ThemeIcon name="chevron-forward" type="ionic" color="#a3a3a3" />
                            </ThemedView>
                        </ThemedView>
                    ))}
                </ThemedView>

                <ThemedView 
                    style={[
                        styles.row, 
                        { backgroundColor: 'white', borderRadius: 10, paddingRight: 5, paddingLeft: 10}
                    ]}
                    onTouchStart={logout}
                >
                    <ThemedText type="link" style={styles.zinColor}>deconnexion</ThemedText>
                    <ThemeIcon name="logout" type="ant" color="#a3a3a3" />
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
        padding: 10,
        borderRadius: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    rowContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //columnGap: 20
    },
    zinColor: {
        color: '#a3a3a3',
        textTransform: 'capitalize'
    }
});