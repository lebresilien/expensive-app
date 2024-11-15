import { Image, StyleSheet, Platform, SafeAreaView, StatusBar, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemeIcon } from '@/components/ThemeIcon';
import { useState } from 'react';

type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function HomeScreen({ lightColor, darkColor}: ThemedTextProps) {

  const [selected, setSelected] = useState<'incomes' | 'expenses'>('incomes');

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.scroll}>
      
        <ThemedView style={styles.subContainer}>
          
          <ThemedView style={[{ backgroundColor }, styles.header]}>

            <ThemedView style={styles.headerWrapper}>
              
              <ThemedText type='link' style={{fontWeight: 'bold'}}>Bienvenu</ThemedText>
              
              <ThemedView style={styles.icons}>
                
                <ThemedView style={[{ backgroundColor: background }, styles.iconWrapper]}>
                  <ThemeIcon name='calendar' type='ionic' />
                </ThemedView>

                <ThemedView style={[{ backgroundColor: background }, styles.iconWrapper]}>
                  <ThemeIcon name='add' type='ionic' />
                </ThemedView>

              </ThemedView>

            </ThemedView>

            <ThemedText type='link'>1 Nov - 31 Nov 2024</ThemedText>

          </ThemedView>

          <ThemedView style={[{ backgroundColor }, styles.card]}>

            <ThemedText type='defaultSemiBold'>Solde</ThemedText>

            <ThemedText type='defaultSemiBold' style={styles.bold}>26000 FCFA</ThemedText>

              <ThemedView style={styles.content}>

                <ThemedView style={{rowGap: 10}}>

                  <ThemedView style={styles.wrap}>

                    <ThemedView style={[styles.iconWrapper, { backgroundColor: '#22c55e' }]}>
                      <ThemeIcon name='arrow-down' type='ionic' size={13} />
                    </ThemedView>
                    
                    <ThemedText>revenus</ThemedText>

                  </ThemedView>

                  <ThemedText type='link'>5000 fcfa</ThemedText>

                </ThemedView>

                <ThemedView style={{rowGap: 10}}>

                  <ThemedView style={styles.wrap}>

                    <ThemedView style={[styles.iconWrapper, { backgroundColor: '#dc2626' }]}>
                      <ThemeIcon name='arrow-up' type='ionic' size={13} />
                    </ThemedView>
                    
                    <ThemedText>revenus</ThemedText>

                  </ThemedView>

                  <ThemedText type='link'>5000 fcfa</ThemedText>

                </ThemedView>

              </ThemedView>

          </ThemedView>

          <ThemedView style={[ { backgroundColor }, styles.swiper]}>
                
            <ThemedView
              onTouchStart={() => setSelected('incomes')}
              style={[styles.swiperItem, selected === 'incomes' && styles.selected]}
            >
              <ThemedText style={[selected === 'incomes' && {color: 'red'}]}>revenus</ThemedText>
            </ThemedView>

            <ThemedView 
              onTouchStart={() => setSelected('expenses')}
              style={[styles.swiperItem, selected === 'expenses' && styles.selected]}
            >
              <ThemedText style={[selected === 'expenses' && {color: 'red'}]}>depenses</ThemedText>
            </ThemedView>

          </ThemedView>

        </ThemedView>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  scroll: {
    flex: 1
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 5
  },
  card: {
    borderRadius: 10,
    rowGap: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  content:{
    display: 'flex',
    flexDirection: 'row',
    columnGap: 50
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 5
  },
  subContainer: {
    flex: 1,
    rowGap: 50
  },
  swiper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    padding: 10,
    justifyContent: 'space-around'
  },
  swiperItem: {
    flex: 0.45,
    alignItems: 'center',
    paddingBottom: 5
  },
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold'
  },
});
