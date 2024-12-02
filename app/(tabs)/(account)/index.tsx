import api from "@/app/lib/api";
import { Loading } from "@/components/Loading";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeIcon } from "@/components/ThemeIcon";
import { UserContext } from "@/hooks/userContext";
import { TabDisplayContext } from "@/hooks/useTabDisplay";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

const navItem = [
    {
        name: 'depenses',
        selected: true
    },
    {
        name: 'revenus',
        selected: false
    }
];

const FAB = ({ backgroundColor, value } : { backgroundColor: string, value: string }) => {
    
    const { setDisplay } = useContext(TabDisplayContext);

    return (
      <TouchableOpacity
        style={[styles.fab, { backgroundColor }]}
        onPress={() => {
          // Handle button press
          setDisplay('none');
          router.navigate({pathname: '/modal', 
            params: {
                type: value
            }
          })
        }}
      >
        <ThemeIcon name="plus" size={24} />
      </TouchableOpacity>
    );
  };

export default function AccountScreen({ lightColor, darkColor}: ThemedTextProps) {

    const [links, setLinks] = useState(navItem);
    //const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<'depenses' | 'revenus'>('depenses')

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    const { 
        expensiveCategories, 
        incomeCategories,
        setExpensiveCategories,
        setIncomeCategories
    } = useContext(UserContext);

    const { showActionSheetWithOptions } = useActionSheet();

    const selectedItem = (name: string) => {
        const spreadLinks = [...links];
        const item = spreadLinks.find((item) => item.name === name);
        const anotherItem = spreadLinks.find((item) => item.name !== name);
        if(item && anotherItem) {
            item.selected = true;
            if(item.name === 'depenses') setItem('depenses')
                else setItem('revenus')
            anotherItem.selected = false;
            setLinks(spreadLinks);
        }
    }

    /* useEffect(() => {
        api.get('categories')
        .then((res) => {
            if(res.data.success) {
                setIncomeCategories(res.data.data.incomes);
                setExpensiveCategories(res.data.data.expenses);
            }
        })
        .finally(() => setLoading(false))
    }, []); */

    const deleteItem = (id: number) => {
        api.delete(`categories/${id}`)
        .then(() => {
            if(item === "depenses") {
                const copyValue = [...expensiveCategories];
                // @ts-ignore
                const data = copyValue.filter((item) => parseInt(item.id) !== parseInt(current.id.toString()));
                setExpensiveCategories(data);
            } else {
                const copyValue = [...incomeCategories];
                // @ts-ignore
                const data = copyValue.filter((item) => parseInt(item.id) !== parseInt(current.id.toString()));
                setIncomeCategories(data);
            }
            
        })
        .catch((err) => {
            alert(err.response.data.message);
        })
    }

    const showConfirmDialog = (id: number) => {
        const options = ['Supprimer', 'Annuler'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 1;
    
        showActionSheetWithOptions({
          options,
          cancelButtonIndex,
          destructiveButtonIndex
        // @ts-ignore
        }, (selectedIndex: number) => {
          switch (selectedIndex) {
            case destructiveButtonIndex:
              // Delete
              deleteItem(id);
              break;
    
            case cancelButtonIndex:
              // Canceled
          }});
      }

    return (
        <SafeAreaView style={styles.container}>

            <ThemedText type="defaultSemiBold" style={{ marginHorizontal: 10, textAlign: 'center' }}>Categories</ThemedText>

            <ThemedView style={styles.nav}>
                {links.map((item) => (
                    <ThemedView
                        style={[
                            styles.navItem, 
                            item.selected ? { backgroundColor: color } : { backgroundColor }, 
                            (item.name === "depenses" && item.selected) && { borderStartEndRadius: 10, borderStartStartRadius: 10 },
                            (item.name === "revenus" && item.selected) && { borderEndEndRadius: 10, borderEndStartRadius: 10 }
                        ]} 
                        key={item.name}
                        onTouchStart={() => selectedItem(item.name)}
                    >
                        <ThemedText 
                            type="link" 
                            style={[styles.text, item.selected &&  { color: 'white' }]}
                        >
                            {item.name}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>
{/* 
            {loading ? 
            
                <Loading /> :  */}

                <ScrollView>

                    {item === 'depenses' ? 
                    <>
                        {expensiveCategories.map((item, index) => (
                            <ThemedView 
                                key={item.id} 
                                style={[
                                    styles.item,
                                    (index + 1) < expensiveCategories.length && { borderBottomWidth: 1, borderColor: backgroundColor}
                                ]}
                            >
                                <ThemedText style={styles.itemText}>{item.name}</ThemedText>
                                <ThemeIcon name="trash" size={24} color="#ef4444" onPress={() => showConfirmDialog(item.id)} />
                            </ThemedView>
                        ))}
                    </> :
                    <>
                        {incomeCategories.map((item, index) => (
                            <ThemedView 
                                key={item.id} 
                                style={[
                                    styles.item,
                                    (index + 1) < incomeCategories.length && { borderBottomWidth: 1, borderColor: backgroundColor}
                                ]}
                            >
                                <ThemedText style={styles.itemText}>{item.name}</ThemedText>
                                <ThemeIcon name="trash" size={24} color="#ef4444" onPress={() => showConfirmDialog(item.id)} />
                            </ThemedView>
                        ))}
                    </>
                    }

                </ScrollView>

            {/* } */}


            <FAB backgroundColor={backgroundColor} value={item} />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //paddingTop: StatusBar.currentHeight,
      //paddingHorizontal: 10,
      rowGap: 20,
      paddingVertical: 10
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    navItem: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 50,
        padding: 15,
        elevation: 5,
    },
    itemText: {
        textTransform: 'capitalize',
        fontWeight: '500'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 10
    },
});