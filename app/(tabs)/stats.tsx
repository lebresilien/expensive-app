import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import api from "../lib/api";
import { Loading } from "@/components/Loading";

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

const navItem = [
    {
        name: 'mensuelle',
        selected: true
    },
    {
        name: 'annuelle',
        selected: false
    }
];

export default function StatisticScreen({ lightColor, darkColor}: ThemedTextProps) {

    const [links, setLinks] = useState(navItem);
    const [item, setItem] = useState<'mensuelle' | 'annuelle'>('mensuelle');
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
    
    const selectedItem = (name: string) => {
        const spreadLinks = [...links];
        const item = spreadLinks.find((item) => item.name === name);
        const anotherItem = spreadLinks.find((item) => item.name !== name);
        if(item && anotherItem) {
            item.selected = true;
            // @ts-ignore
            setItem(name);
            anotherItem.selected = false;
            setLinks(spreadLinks);
        }
    }

    useEffect(() => {
        api.get('transactions', {
            params: {
                type: 'month'
            }
        })
        .then((res) => {
            const data = res.data.data;
            setMonths(data.months);
            setYears(data.years);
        })
        .catch((err) =>  alert(err.response.data.message))
        .finally(() => setLoading(false))
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <ThemedText type="defaultSemiBold" style={{ marginHorizontal: 10, textAlign: 'center' }}>Statistiques</ThemedText>

            <ThemedView style={[styles.header, { backgroundColor }]}>
                {links.map((item) => (
                    <ThemedView
                        style={[
                            styles.navItem, 
                            item.selected && { backgroundColor: 'white', borderRadius: 10 }
                        ]} 
                        key={item.name}
                        onTouchStart={() => selectedItem(item.name)}
                    >
                        <ThemedText 
                            type="link" 
                            style={[styles.text]}
                        >
                            {item.name}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>

            {loading ? <Loading /> :

                <ScrollView>

                    {item === 'mensuelle' ?
                        <ThemedView style={styles.content}>

                            <ThemedView style={[styles.selectedPeriod, { backgroundColor }]}>

                                <ThemedText>
                                    { months[months.length - 1] }
                                </ThemedText>

                            </ThemedView>

                        </ThemedView>
                        :
                        <ThemedView style={styles.content}>

                            <ThemedView style={[styles.selectedPeriod, { backgroundColor }]}>

                                <ThemedText>
                                    { years[years.length - 1] }
                                </ThemedText>

                            </ThemedView>

                        </ThemedView>
                    }

                </ScrollView>
            }

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      rowGap: 20,
      paddingVertical: 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 1,
        paddingVertical: 3,
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    navItem: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    text: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    content: {
        display: 'flex',
        rowGap: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedPeriod: {
        borderRadius: 10,
        padding: 5
    }
});