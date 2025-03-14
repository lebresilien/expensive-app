import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemeIcon } from "@/components/ThemeIcon";
import { ItemList } from ".";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type ThemedTextProps = {
  lightColor?: string
  darkColor?: string
};

export default function DetailModal({ lightColor, darkColor }: ThemedTextProps) {
  const router = useRouter();
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  const { data, name, type, start, end } = useLocalSearchParams();
  const items = data ? JSON.parse(data): [];
  const isExpens = Array.isArray(type) ? type[0] : type;

  return (
    <GestureHandlerRootView style={styles.overlay}>
      <ThemedView style={[styles.modalContainer]}>

        <ThemedView style={styles.header}>
          <ThemeIcon name="close" type="ant" onPress={() => router.back()} />
        </ThemedView>

        <ThemedView style={styles.title}>
          <ThemedText type="link" style={{textAlign: 'center'}}> Transactions de {name} du {Array.isArray(start) ? `${start[0].split(' ')[0]} ${start[0].split(' ')[1]}` : `${start.split(' ')[0]} ${start.split(' ')[1]}`} - {end} </ThemedText>
        </ThemedView>

        <ScrollView contentContainerStyle={styles.content}>
          {items.map((item: any) => (
            <ItemList
              key={item.id}
              id={item.id}
              name={item.name}
              amount={item.amount}
              date={item.date}
              background={background}
              backgroundColor={backgroundColor}
              isExpens={isExpens === "1" ? true : false}
              color={color}
            /> 
          ))}

        </ScrollView>

      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "100%",
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "55%",
    overflowY: "scroll",
    rowGap: 10,
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "flex-end"
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    rowGap: 5
  }
});
