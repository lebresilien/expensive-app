import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from "react";
import { ExpenseContext } from "@/hooks/useExpense";
import { ThemeIcon } from "@/components/ThemeIcon";
import { router } from "expo-router";
import { Loading } from "@/components/Loading";
import ThemedButton from "@/components/ThemedButton";
import api from "@/app/lib/api";

type ThemedTextProps = {
    lightColor?: string
    darkColor?: string
};

export default function Filter({ lightColor, darkColor }: ThemedTextProps) {

    const [selectedMonth, setSelectedMonth] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {  
        setExpenses,  
        setIncomes, 
        setTotalIncomes, 
        setTotalExpenses,
        months,
        setStartMonth,
        setEndMonth
      } = useContext(ExpenseContext);

    const filter = () => {
        setIsSubmitting(true);
        api.get('transactions',{
            params: {
                start: selectedMonth.split('-')[0],
                end: selectedMonth.split('-')[1]
            }
        })
        .then((res) => {
          if(res.data.success) {
            setIncomes(res.data.data.incomes);
            setExpenses(res.data.data.expenses);
            setTotalExpenses(parseFloat(res.data.data.totalExpenses));
            setTotalIncomes(parseFloat(res.data.data.totalIncomes));
            setStartMonth( selectedMonth.split('-')[0]);
            setEndMonth( selectedMonth.split('-')[1]);
            router.back();
          }
        })
        .finally(() => {
            setIsSubmitting(false);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>

                <ThemedView style={styles.header}>

                    <ThemedView style={styles.nav} onTouchStart={() => router.back()}>
                        <ThemeIcon type='ionic' name='chevron-back' size={20} />
                        <ThemedText type='button'>Annuler</ThemedText>
                    </ThemedView>

                    {isSubmitting ? 
                        <Loading /> :
                        <ThemedButton 
                            title='Filtrer'
                            isValid={selectedMonth ? true : false}
                            onPress={filter} 
                        />
                    }
                </ThemedView>

                <ThemedView style={styles.content}>
                    <ThemedText type="defaultSemiBold">Selectionnez le mois</ThemedText>
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedMonth(itemValue)
                        }
                    >
                        {months.map((item, index) => (
                            <Picker.Item
                                key={index} 
                                label={`${item.startMonth} - ${item.endMonth}`} 
                                value={`${item.startMonth} - ${item.endMonth}`} 
                            />
                        ))}
                    </Picker>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 5,
      //paddingTop: StatusBar.currentHeight
    },
    scroll: {
        flex: 1
    },
    content: {
        flex: 1,
        marginTop: 50
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
});