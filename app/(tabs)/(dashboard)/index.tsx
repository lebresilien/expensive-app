import { StyleSheet, SafeAreaView, StatusBar, ScrollView, Modal, Pressable } from 'react-native';

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
import { BlurView } from 'expo-blur';
import { UserContext } from '@/hooks/userContext';

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
 
  const { 
    expenses, 
    setExpenses, 
    incomes, 
    setIncomes, 
    totalIncomes, 
    setTotalIncomes, 
    totalExpenses, 
    setTotalExpenses, 
    setMonths,
    startMonth, 
    setStartMonth,
    endMonth, 
    setEndMonth

  } = useContext(ExpenseContext);
  const { setDisplay } = useContext(TabDisplayContext);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
  const { 
    expensiveCategories, 
    incomeCategories,
    setExpensiveCategories,
    setIncomeCategories
} = useContext(UserContext);

  useEffect(() => {
    api.get('transactions')
    .then((res) => {
      if(res.data.success) {
        setIncomes(res.data.data.incomes);
        setExpenses(res.data.data.expenses);
        setTotalExpenses(parseFloat(res.data.data.totalExpenses));
        setTotalIncomes(parseFloat(res.data.data.totalIncomes));
        setStartMonth(res.data.data.startMonth);
        setEndMonth(res.data.data.endMonth);
        setMonths(res.data.data.months);
        setIncomeCategories(res.data.data.categoryIncomes);
        setExpensiveCategories(res.data.data.categoryExpenses);
      }
    })
    .finally(() => setLoading(false))
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar animated={true} backgroundColor="#0ea5e9" />

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
                    //setDisplay('flex');
                    router.push('/semi-modal');
                  }}
                >
                  <ThemeIcon name='add' type='ionic' />
                </ThemedView>

              </ThemedView>

            </ThemedView>

            <ThemedText type='link'>{startMonth ? `${startMonth.split(' ')[0]} ${startMonth.split(' ')[1]} - ${endMonth}` : ''}</ThemedText>

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
                        
                        <ThemedText>Revenus</ThemedText>

                      </ThemedView>

                      <ThemedText type='link'>{ totalIncomes } FCFA</ThemedText>

                    </ThemedView>

                    <ThemedView style={{rowGap: 10}}>

                      <ThemedView style={styles.wrap}>

                        <ThemedView style={[styles.iconWrapper, { backgroundColor: '#dc2626' }]}>
                          <ThemeIcon name='arrow-up' type='ionic' size={13} />
                        </ThemedView>
                        
                        <ThemedText>Depenses</ThemedText>

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
                  <ThemedText style={[selected === 'incomes' && { color: background, fontWeight: 'bold' }]}>Revenus</ThemedText>
                </ThemedView>

                <ThemedView 
                  onTouchStart={() => setSelected('expenses')}
                  style={[styles.swiperItem, selected === 'expenses' && ([styles.selected, { borderBottomColor: background }])]}
                >
                  <ThemedText style={[selected === 'expenses' && { color: background, fontWeight: 'bold' }]}>Depenses</ThemedText>
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
              
              <ThemedView style={[styles.modalView, { backgroundColor }]}>
                
                <ThemedView style={styles.row}>
                  <ThemedText type="link">Date debut</ThemedText>
                  <ThemedView style={[styles.border, { backgroundColor: background }]}>
                    <ThemedText type="link">{startMonth ? `${startMonth.split(' ')[0]} ${startMonth.split(' ')[1]}` : ''}</ThemedText>
                  </ThemedView>
                </ThemedView>

                <ThemedView style={styles.row}>
                  <ThemedText type="link">Date fin</ThemedText>
                  <ThemedView style={[styles.border, { backgroundColor: background }]}>
                    <ThemedText type="link">{endMonth}</ThemedText>
                  </ThemedView>
                </ThemedView>

                <ThemedView style={[styles.row, { justifyContent: 'center', columnGap: 10, marginTop: 10 }]}>
                  <Pressable style={styles.pressable} onPress={() => setModalVisible(false) }>
                    <ThemedText type='link' style={styles.white}>Annuler</ThemedText>
                  </Pressable>
                  <Pressable 
                    style={[styles.pressable, { backgroundColor: 'green'}]} 
                    onPress={() => { 
                      setModalVisible(false) ;
                      router.push('/filter');
                    }}
                  >
                    <ThemedText type='link' style={styles.white}>Filtrer</ThemedText>
                  </Pressable>
                </ThemedView>

              </ThemedView>

            </ThemedView>
          </Modal>

        </ThemedView>

      </ScrollView>
      {modalVisible && ((
        <BlurView 
          style={{ flex: 1 }} 
          tint="systemThickMaterialDark" 
          intensity={100}
        />
      ))}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    // @ts-ignore
    ...StyleSheet.absoluteFill,
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
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    rowGap: 10
  },
  shadow: {
    opacity: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  blurContainer: {
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 30,
    alignItems: 'center'
  },
  border:{
    padding: 5,
    borderRadius: 10
  },
  white: {
    color:     '#eee'
  },
  pressable: {
    backgroundColor: 'red', 
    padding: 7, 
    borderRadius: 10
  }
});
