import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeIcon } from "@/components/ThemeIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useContext, useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
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
    expiredAt: string,
    savings: {
        amount: number
        day: string
    }[]
}

const GoalItem = (
    { 
        goal,
        handlePointerEnter,
        lightColor, 
        darkColor 
    }: 
    { 
        goal: Goal,
        handlePointerEnter: (goal: Goal) => void,
        lightColor?: string, 
        darkColor?: string 
    }
    ) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    return (
        <Pressable onPress={() => handlePointerEnter(goal)}>
            <ThemedView style={styles.itemContainer}>
                <ThemedText type="defaultSemiBold">{ goal.name }</ThemedText>
                <Progress.Bar progress={(goal.savingAmount / goal.amount)} width={null} color={color} />
                <ThemedView style={styles.percent}>
                    <ThemedText type='link'>{ goal.savingAmount } fcfa</ThemedText>
                    <ThemedText type='link' style={{fontWeight: '700'}}>{ goal.amount } fcfa</ThemedText>
                </ThemedView>
                <ThemedText type='link' style={styles.advice}>Chaque piéce compte</ThemedText> 
            </ThemedView>
        </Pressable> 
    )
}

export default function SettingScreen({ lightColor, darkColor}: ThemedTextProps) {

    const { goals, setGoals, current, setCurrent } = useContext(GoalContext);
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

    const handlePointerEnter = (goal: Goal) => {
        setCurrent(goal);
        router.navigate('/details');
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
            
            <ScrollView>
                {loading ? 

                    <Loading />
                    :
                    <ThemedView style={styles.gap}>
                        <ThemedText type='title'>Objectifs Financiers</ThemedText>
                        <ThemedView>
                            {goals.map((item, index) => (
                                <ThemedView key={index} style={[{ backgroundColor }, styles.list]}>
                                    <GoalItem
                                        goal={item}
                                        handlePointerEnter={handlePointerEnter}
                                    />
                                   {/*  { (index + 1) < goals.length && <ThemedView style={styles.line}></ThemedView>} */}
                                </ThemedView>
                            ))}
                        </ThemedView>
                    </ThemedView>
                }
            </ScrollView>
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
        borderBottomWidth: 0.2,
        borderBottomColor: '#d4d4d4'  
    },
    advice: {
        fontSize: 14
    },
    white: {
        color: '#eee'
    },
    gap: {
        rowGap: 10
    }
});