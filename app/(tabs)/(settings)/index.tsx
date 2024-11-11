import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeIcon } from "@/components/ThemeIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import * as Progress from 'react-native-progress';
import api from "../../lib/api";
import { Loading } from "@/components/Loading";
import { router } from "expo-router";
import { TabDisplayContext } from "@/hooks/useTabDisplay";
import { GoalContext } from "@/hooks/useGoal";

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

export type Goal = {
    id: string
    name: string
    amount: number
    savingAmount: number
    expiredAt: string
}

const GoalItem = (
    { 
        id, 
        name, 
        amount, 
        savingAmount,
        expiredAt, 
        lightColor, 
        darkColor 
    }: 
    { 
        id: string, 
        name: string, 
        amount: number, 
        savingAmount: number, 
        expiredAt: string,
        lightColor?: string, 
        darkColor?: string 
    }
    ) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    return (
        <ThemedView style={styles.itemContainer}>
            <ThemedText type="defaultSemiBold">{ name }</ThemedText>
            <Progress.Bar progress={(savingAmount / amount)} width={null} color={color} />
            <ThemedView style={styles.percent}>
                <ThemedText type='link'>{ savingAmount } fcfa</ThemedText>
                <ThemedText type='link' style={{fontWeight: '700'}}>{ amount } fcfa</ThemedText>
            </ThemedView>
            <ThemedText type='link' style={styles.advice}>Chaque piéce compte</ThemedText> 
        </ThemedView>  
    )
}

export default function SettingScreen({ lightColor, darkColor}: ThemedTextProps) {

    const { goals, setGoals } = useContext(GoalContext);
    const { setDisplay } = useContext(TabDisplayContext);

    const [loading, setLoading] = useState(true);
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
    useEffect(() => {
        const fetchData = () => {
            api.get('goals')
            .then((res) => {
                setGoals(res.data.data);
            })
            .catch(() => {
                alert('error vv')
            })
            .finally(() => {
                setLoading(false);
            })
        }
        fetchData();
    }, []);

    const add = () => {
        setDisplay('none');
        router.navigate('/modal');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.bar}>
                <ThemedView style={styles.barItem}>
                    <ThemeIcon name='chevron-back' type='ionic' />
                    <ThemedText type='subtitle'>Settings</ThemedText>
                </ThemedView>
                <ThemeIcon name='add' type='ionic' onPress={add} />
            </ThemedView>
            <ThemedView>
                <ThemedText type='title'>Objectifs Financiers</ThemedText>
            </ThemedView>

            {loading ? 
                <Loading />
                :
                <ScrollView style={[{ backgroundColor }, styles.list]}>
                    {goals.map((item, index) => (
                        <ThemedView key={index} >
                            <GoalItem
                                id={item.id}
                                name={item.name}
                                savingAmount={item.savingAmount}
                                amount={item.amount}
                                expiredAt={item.expiredAt}
                            />
                            { (index + 1) < goals.length && <ThemedView style={styles.line}></ThemedView>}
                        </ThemedView>
                    ))}
                </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 10,
      rowGap: 20
    },
    bar: {
        paddingTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    barItem: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 5,
        alignItems: 'center'
    },
    list: {
        rowGap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    itemContainer: {
        paddingBottom: 10,
        rowGap: 2
    },
    percent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee'  
    },
    advice: {
        fontSize: 14
    },
    white: {
        color: '#eee'
    }
});