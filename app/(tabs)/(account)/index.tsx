import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeIcon } from "@/components/ThemeIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

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
    return (
      <TouchableOpacity
        style={[styles.fab, { backgroundColor }]}
        onPress={() => {
          // Handle button press
          alert(value)
        }}
      >
        <ThemeIcon name="plus" size={24} />
      </TouchableOpacity>
    );
  };

export default function AccountScreen({ lightColor, darkColor}: ThemedTextProps) {

    const [links, setLinks] = useState(navItem);
    const [item, setItem] = useState<'depenses' | 'revenus'>('depenses')

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
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

    return (
        <SafeAreaView style={styles.container}>

            <ThemedText type="defaultSemiBold">Categories</ThemedText>

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

            <FAB backgroundColor={backgroundColor} value={item} />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 10,
      rowGap: 20
    },
    nav: {
        display: 'flex',
        flexDirection: 'row'
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
    }
});