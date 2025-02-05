
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeIcon } from '@/components/ThemeIcon';
import { UserContext } from '@/hooks/userContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

type ThemedTextProps = {
    lightColor?: string
    darkColor?: string
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

export default function HomeScreen({ lightColor, darkColor}: ThemedTextProps) {

    const [links, setLinks] = useState(navItem);
    const [type, setType] = useState<'depenses' | 'revenus'>('depenses');

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
    const { 
        expensiveCategories, 
        incomeCategories
    } = useContext(UserContext);

    const selectedItem = (name: string) => {
        const spreadLinks = [...links];
        const item = spreadLinks.find((item) => item.name === name);
        const anotherItem = spreadLinks.find((item) => item.name !== name);
        if(item && anotherItem) {
            item.selected = true;
            if(item.name === 'depenses') setType('depenses')
                else setType('revenus')
            anotherItem.selected = false;
            setLinks(spreadLinks);
        }
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
                        // @ts-ignore
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

            <ScrollView>

                {type === 'depenses' ? 
                    <>
                        {expensiveCategories.map((item, index) => (
                            <ThemedView 
                                key={item.id} 
                                style={[
                                    styles.item,
                                    (index + 1) < expensiveCategories.length && { borderBottomWidth: 1, borderColor: backgroundColor}
                                ]}
                                onTouchStart={() => {
                                    router.navigate({pathname: '/transaction',
                                        params: {
                                            id: item.id,
                                            name: item.name,
                                            type: type
                                        }
                                    })
                                }}
                            >
                                <ThemedText style={styles.itemText}>{item.name}</ThemedText>
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
                                onTouchStart={() => {
                                    router.navigate({pathname: '/transaction',
                                        params: {
                                            id: item.id,
                                            name: item.name,
                                            type: type
                                        }
                                    })
                                }}
                            >
                                <ThemedText style={styles.itemText}>{item.name}</ThemedText>
                            </ThemedView>
                        ))}
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      rowGap: 20,
      paddingVertical: 10,
      backgroundColor: 'transparent'
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
    }
});