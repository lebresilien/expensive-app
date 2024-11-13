import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GoalContext } from '@/hooks/useGoal';
import { TabDisplayContext } from '@/hooks/useTabDisplay';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, Pressable } from 'react-native';

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

export default function DetailScreen({ lightColor, darkColor}: ThemedTextProps) {

    const { setDisplay } = useContext(TabDisplayContext);
    const { current } = useContext(GoalContext);
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');

    const load = () => {
        setDisplay('none');
        router.navigate('/modal-saving');
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <ScrollView style={styles.scroll}>
                
                <ThemedText type='title'>Details de l'objectif</ThemedText>
                
                <ThemedView style={[{ backgroundColor }, styles.list]}>
                    <ThemedText>{current?.name}</ThemedText>
                    <ThemedView style={styles.row}>
                        <ThemedText>Montant Actuel:</ThemedText>
                        <ThemedText>{current?.savingAmount} fcfa</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText>Montant à atteindre:</ThemedText>
                        <ThemedText>{current?.amount} fcfa</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText>Date limite:</ThemedText>
                        <Pressable style={styles.pressable}>
                            <ThemedText>{current?.expiredAt}</ThemedText>
                        </Pressable>
                    </ThemedView>
                    <Pressable>
                        <ThemedText style={styles.edit}>Modifier l'objectif</ThemedText>
                    </Pressable>
                </ThemedView>

                <ThemedView>
                    <ThemedText>Economies</ThemedText>
                    <ThemedView style={[{ backgroundColor }, styles.list]}>
                        {current?.savings.map((item, index) => (
                          <ThemedView key={index} style={styles.row}>
                            <ThemedText>{item.day}</ThemedText>
                            <ThemedText>{item.amount}</ThemedText>
                          </ThemedView>  
                        ))}
                        <Pressable onPress={load}>
                            <ThemedText type='button'>Ajouter une économie</ThemedText> 
                        </Pressable>
                    </ThemedView>
                </ThemedView>

                <ThemedView>
                    <ThemedText>Affichage des widgets</ThemedText>
                    <ThemedView style={[{ backgroundColor }, styles.list]}>
                        <Pressable>
                            <ThemedText type='button'>Affichage petit widget</ThemedText> 
                        </Pressable>
                        <Pressable>
                            <ThemedText type='button'>Affichage grand widget</ThemedText> 
                        </Pressable>
                    </ThemedView>
                </ThemedView>

                <Pressable style={[{ backgroundColor }, styles.list]}> 
                    <ThemedText type='delete'>Supprimer l'objectif</ThemedText> 
                </Pressable>

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
    scroll: {
       flex: 1,
       paddingVertical: 20
    },
    list: {
        rowGap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pressable: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: '#d4d4d4'
    },
    edit: {
        fontWeight: '100'
    }
});