
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function LoginScreen() {
    return (
        <SafeAreaView style={styles.container}>
       
            <ThemedText type="title">login</ThemedText>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
});
  