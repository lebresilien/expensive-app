import { StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemeIcon } from '@/components/ThemeIcon';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Loading } from '@/components/Loading';
import { router } from 'expo-router';

type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
};

export type Transaction = {
  id: string;
  name: string;
  amount: number,
  date: string
};

const ItemList = ({
  name, 
  date, 
  amount,
  isExpens,
  background,
  backgroundColor, 
  color
  }: {
    name: string,
    date: string,
    amount: number,
    isExpens: boolean,
    background: string,
    backgroundColor: string, 
    color: string
  } ) => (
    <ThemedView style={[styles.itemContainer, { backgroundColor: backgroundColor }]}>
      <ThemedView style={styles.itemFirstBlock}>
        <ThemedView style={[{ backgroundColor: background }, styles.avatar]}>
          <ThemedText style={[{textTransform: 'uppercase'}, {color}]}>{ name.charAt(0) }</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type='link' style={styles.bold}>{ name }</ThemedText>
          <ThemedText type='link' style={{fontWeight: '100'}}>{ date }</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedText style={{color: isExpens ? 'red' : 'green'}}>{ amount } FCFA</ThemedText>
    </ThemedView>
  )

export default function HomeScreen({ lightColor, darkColor}: ThemedTextProps) {

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<'incomes' | 'expenses'>('incomes');
  const [expenses, setExpenses] = useState<Transaction[] | []>([]);
  const [incomes, setIncomes] = useState<Transaction[] | []>([]);
  const [totalIcomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  useEffect(() => {
    api.get('transactions')
    .then((res: any) => {
      if(res.data.success) {
        setIncomes(res.data.data.incomes);
        setExpenses(res.data.data.expenses);
        setTotalExpenses(parseFloat(res.data.data.totalExpenses));
        setTotalIncomes(parseFloat(res.data.data.totalIncomes));
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

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

                <ThemedView 
                  style={[{ backgroundColor: background }, styles.iconWrapper]}
                  onTouchStart={() => router.push('/transaction')}
                >
                  <ThemeIcon name='add' type='ionic' />
                </ThemedView>

              </ThemedView>

            </ThemedView>

            <ThemedText type='link'>1 Nov - 31 Nov 2024</ThemedText>

          </ThemedView>

          {loading ? 
          
            <Loading />:
        
            <ThemedView style={{rowGap: 20}}>

              <ThemedView style={[{ backgroundColor }, styles.card]}>

                <ThemedText type='defaultSemiBold'>Solde</ThemedText>

                <ThemedText type='defaultSemiBold' style={styles.bold}>{ totalIcomes - totalExpenses } FCFA</ThemedText>

                  <ThemedView style={styles.content}>

                    <ThemedView style={{rowGap: 10}}>

                      <ThemedView style={styles.wrap}>

                        <ThemedView style={[styles.iconWrapper, { backgroundColor: '#22c55e' }]}>
                          <ThemeIcon name='arrow-down' type='ionic' size={13} />
                        </ThemedView>
                        
                        <ThemedText>revenus</ThemedText>

                      </ThemedView>

                      <ThemedText type='link'>{ totalIcomes } FCFA</ThemedText>

                    </ThemedView>

                    <ThemedView style={{rowGap: 10}}>

                      <ThemedView style={styles.wrap}>

                        <ThemedView style={[styles.iconWrapper, { backgroundColor: '#dc2626' }]}>
                          <ThemeIcon name='arrow-up' type='ionic' size={13} />
                        </ThemedView>
                        
                        <ThemedText>revenus</ThemedText>

                      </ThemedView>

                      <ThemedText type='link'>{ totalExpenses } FCFA</ThemedText>

                    </ThemedView>

                  </ThemedView>

              </ThemedView>

              <ThemedView style={[ { backgroundColor }, styles.swiper]}>
                    
                <ThemedView
                  onTouchStart={() => setSelected('incomes')}
                  style={[styles.swiperItem, selected === 'incomes' && ([styles.selected, { borderBottomColor: background }])]}
                >
                  <ThemedText style={[selected === 'incomes' && { color: background, fontWeight: 'bold' }]}>revenus</ThemedText>
                </ThemedView>

                <ThemedView 
                  onTouchStart={() => setSelected('expenses')}
                  style={[styles.swiperItem, selected === 'expenses' && ([styles.selected, { borderBottomColor: background }])]}
                >
                  <ThemedText style={[selected === 'expenses' && { color: background, fontWeight: 'bold' }]}>depenses</ThemedText>
                </ThemedView>

              </ThemedView>

              <ThemedView style={{marginHorizontal: 10, rowGap: 10}}>
                {selected === "expenses" ? 
                  <>
                    {expenses.map((item, index) => (
                      <ItemList
                        key={index}
                        name={item.name}
                        amount={item.amount}
                        date={item.date}
                        background={background}
                        backgroundColor={backgroundColor}
                        isExpens={true}
                        color={color}
                      />
                    ))}
                  </>:
                  <>
                    {incomes.map((item, index) => (
                      <ItemList
                        key={index}
                        name={item.name}
                        amount={item.amount}
                        date={item.date}
                        background={background}
                        backgroundColor={backgroundColor}
                        isExpens={false}
                        color={color}
                      />
                    ))}
                  </>
                }
              </ThemedView>

            </ThemedView>

          }

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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2
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
    borderBottomWidth: 2
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold'
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    rowGap: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5
  },
  itemFirstBlock: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
