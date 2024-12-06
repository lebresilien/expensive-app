import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

export default function StatisticScreen({ lightColor, darkColor}: ThemedTextProps) {

    return (
        <SafeAreaView style={styles.container}>
             <ThemedText type="defaultSemiBold" style={{ marginHorizontal: 10, textAlign: 'center' }}>Statistiques</ThemedText>
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
});