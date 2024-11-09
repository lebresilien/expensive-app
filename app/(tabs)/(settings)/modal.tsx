import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import { TabDisplayContext } from '@/hooks/useTabDisplay';
import { Link, router } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, Text, StatusBar } from 'react-native';

export default function Home() {

    const { setDisplay } = useContext(TabDisplayContext);
    
    const cancel = () => {
        setDisplay('flex');
        router.back();
    }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedButton type='cancel' title='Annuler' onPress={cancel} />
        <ThemedButton title='Enregistrer' isValid={false} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    rowGap: 20,
    paddingTop: StatusBar.currentHeight
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});