import { StyleSheet, SafeAreaView, StatusBar, ScrollView, Modal } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemeIcon } from '@/components/ThemeIcon';
import { useContext, useEffect, useState } from 'react';
import api from '../../lib/api';
import { Loading } from '@/components/Loading';
import { router } from 'expo-router';
import { ExpenseContext } from '@/hooks/useExpense';
import { TabDisplayContext } from '@/hooks/useTabDisplay';

type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
};

export type Transaction = {
  id: string;
  name: string;
  amount: number,
  date: string,
  description?: string
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

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<'incomes' | 'expenses'>('incomes');
  const [month, setMonth] = useState('');
 
  const { 
    expenses, 
    setExpenses, 
    incomes, 
    setIncomes, 
    totalIncomes, 
    setTotalIncomes, 
    totalExpenses, 
    setTotalExpenses 
  } = useContext(ExpenseContext);
  const { setDisplay } = useContext(TabDisplayContext);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  useEffect(() => {
    api.get('transactions')
    .then((res) => {
      if(res.data.success) {
        setIncomes(res.data.data.incomes);
        setExpenses(res.data.data.expenses);
        setTotalExpenses(parseFloat(res.data.data.totalExpenses));
        setTotalIncomes(parseFloat(res.data.data.totalIncomes));
        setMonth(res.data.data.month);
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  return (
    <SafeAreaView style={[styles.container, modalVisible && styles.shadow]}>

      <ScrollView style={styles.scroll}>
      
        <ThemedView style={styles.subContainer}>
          
          <ThemedView style={[{ backgroundColor }, styles.header]}>

            <ThemedView style={styles.headerWrapper}>
              
              <ThemedText type='link' style={{fontWeight: 'bold'}}>Bienvenu</ThemedText>
              
              <ThemedView style={styles.icons}>
                
                <ThemedView 
                  style={[{ backgroundColor: background }, styles.iconWrapper]}
                  onTouchStart={() => setModalVisible(true)}
                >
                  <ThemeIcon name='calendar' type='ionic' />
                </ThemedView>

                <ThemedView 
                  style={[{ backgroundColor: background }, styles.iconWrapper]}
                  onTouchStart={() => {
                    setDisplay('none');
                    router.push('/transaction');
                  }}
                >
                  <ThemeIcon name='add' type='ionic' />
                </ThemedView>

              </ThemedView>

            </ThemedView>

            <ThemedText type='link'>{ month }</ThemedText>

          </ThemedView>

          {loading ? 
          
            <Loading />:
        
            <ThemedView style={{rowGap: 20}}>

              <ThemedView style={[{ backgroundColor }, styles.card]}>

                <ThemedText type='defaultSemiBold'>Solde</ThemedText>

                <ThemedText type='defaultSemiBold' style={styles.bold}>{ totalIncomes - totalExpenses } FCFA</ThemedText>

                  <ThemedView style={styles.content}>

                    <ThemedView style={{rowGap: 10}}>

                      <ThemedView style={styles.wrap}>

                        <ThemedView style={[styles.iconWrapper, { backgroundColor: '#22c55e' }]}>
                          <ThemeIcon name='arrow-down' type='ionic' size={13} />
                        </ThemedView>
                        
                        <ThemedText>revenus</ThemedText>

                      </ThemedView>

                      <ThemedText type='link'>{ totalIncomes } FCFA</ThemedText>

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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <ThemedView style={styles.centeredView}>
              <ThemedView style={styles.modalView}>
                <ThemedText onPress={() => setModalVisible(false)}>Hello World!</ThemedText>
              </ThemedView>
            </ThemedView>
          </Modal>

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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  shadow: {
    opacity: 0.5
  }
});
