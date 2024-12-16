import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import api from "../lib/api";
import { Loading } from "@/components/Loading";
import { BarChart, PieChart } from "react-native-chart-kit";

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
    const [datasets, setDataset] = useState({ total_expense: 0, total_income: 0, total_expense_year: 0, total_income_year: 0 });
    const [pieDataset, setPieDataset] = useState([]);
    const [pieDatasetYear, setPieDatasetYear] = useState([]);
    const [mostExpense, setMostExpense] = useState([]);
    const [mostExpenseYear, setMostExpenseYear] = useState([]);

    const screenWidth = Dimensions.get("window").width - 40;

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
    
    const data = {
        labels: ["Revenus", "Depenses"],
        datasets: [
          {
            data: [datasets.total_income, datasets.total_expense]
          }
        ]
    };

    const dataYear = {
        labels: ["Revenus", "Depenses"],
        datasets: [
          {
            data: [datasets.total_income_year, datasets.total_expense_year]
          }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: () => `#a3a3a3`,
        //strokeWidth: 10, // optional, default 3
        barPercentage: 1.5,
        useShadowColorFromDataset: false // optional
    };


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
                type: "month"
            }
        })
        .then((res) => {
            const data = res.data.data;
            setMonths(data.months);
            setYears(data.years);
            setDataset({
                total_expense: data.total_expense_month,
                total_income: data.total_income_month,
                total_expense_year: data.total_expense_year,
                total_income_year: data.total_income_year
            });
            setPieDataset(data.pie_month);
            setPieDatasetYear(data.pie_year);
            setMostExpense(data.most_expense);
            setMostExpenseYear(data.most_expense_year);
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

                            <ThemedView style={[{ backgroundColor: 'white', borderRadius: 10, padding: 10 }]}>
                                
                                <ThemedText style={{ fontWeight: 'bold' }}>Aperçu Mensuel</ThemedText>

                                <BarChart
                                    data={data}
                                    width={screenWidth}
                                    height={220}
                                    yAxisLabel=""
                                    chartConfig={chartConfig}
                                    //verticalLabelRotation={0}
                                    yAxisSuffix=""
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </ThemedView>

                            <ThemedView style={[{ backgroundColor: 'white', borderRadius: 10, padding: 10 }]}>
                                
                                <ThemedText style={{ fontWeight: 'bold' }}>Répartition par Catégorie</ThemedText>
                                
                                <PieChart
                                    data={pieDataset}
                                    width={screenWidth}
                                    height={250}
                                    chartConfig={chartConfig}
                                    accessor={"amount"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}
                                    //center={[10, 50]}
                                    absolute
                                />

                            </ThemedView>

                            <ThemedView style={{ backgroundColor: 'white', marginHorizontal: 10, padding: 10, width: '96%' }}>
                                
                                <ThemedText style={{ fontWeight: 'bold' }}>Depenses les plus élévées</ThemedText>

                                {mostExpense.slice(0, 3).map((item, index) => (
                                    <ThemedView style={styles.list} key={index}>
                                        <ThemedText>{item.name}</ThemedText>
                                        <ThemedText>{item.amount} FCFA</ThemedText>
                                    </ThemedView>
                                ))}

                            </ThemedView>

                        </ThemedView> 
                    :
                        <ThemedView style={styles.content}>

                            <ThemedView style={[styles.selectedPeriod, { backgroundColor }]}>
                                <ThemedText>
                                    { years[years.length - 1] }
                                </ThemedText>
                            </ThemedView>

                            <ThemedView style={[{ backgroundColor: 'white', borderRadius: 10, padding: 10 }]}>
                                
                                <ThemedText style={{ fontWeight: 'bold' }}>Aperçu Annuel</ThemedText>
                                
                                <BarChart
                                    data={dataYear}
                                    width={screenWidth}
                                    height={220}
                                    yAxisLabel=""
                                    chartConfig={chartConfig}
                                    //verticalLabelRotation={0}
                                    yAxisSuffix=""
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />

                            </ThemedView>

                            <ThemedView style={[{ backgroundColor: 'white', borderRadius: 10, padding: 10 }]}>
                                
                                <ThemedText style={{ fontWeight: 'bold' }}>Répartition par Catégorie</ThemedText>
                                
                                <PieChart
                                    data={pieDatasetYear}
                                    width={screenWidth}
                                    height={250}
                                    chartConfig={chartConfig}
                                    accessor={"amount"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}
                                    //center={[10, 50]}
                                    absolute
                                />
                                
                            </ThemedView>

                            <ThemedView style={{ backgroundColor: 'white', marginHorizontal: 10, padding: 10, width: '96%'}}>
                                
                                <ThemedText style={{ fontWeight: 'bold' }}>Depenses les plus élévées</ThemedText>

                                {mostExpenseYear.slice(0, 3).map((item, index) => (
                                    <ThemedView style={styles.list} key={index}>
                                        <ThemedText>{item.name}</ThemedText>
                                        <ThemedText>{item.amount} FCFA</ThemedText>
                                    </ThemedView>
                                ))}

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
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 1,
        paddingVertical: 3,
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
});