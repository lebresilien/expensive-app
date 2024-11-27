import { StyleSheet, TouchableOpacity, Text, View, Alert, StatusBar, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserContext } from '@/hooks/userContext';
import { useContext, useState } from 'react';
import api from '../../lib/api';
import { router } from 'expo-router';
import ThemedButton from '@/components/ThemedButton';
import { Loading } from '@/components/Loading';
import { ThemeIcon } from '@/components/ThemeIcon';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ExpenseContext } from '@/hooks/useExpense';
import { TabDisplayContext } from '@/hooks/useTabDisplay';

type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
};

interface FormValues {
  name: string
  amount: string,
  description: string
}

const RadioButton = ({ 
    label, 
    isSelected, 
    onPress, 
    color 
  }: 
  {
    label: string, 
    isSelected: boolean, 
    onPress: () => void, 
    color: string
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={[styles.radioButton, isSelected && { backgroundColor: color }, { borderColor: color }]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
);

const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aug", "Sept", "Oct", "Nov", "Dec"];
export default function Transaction({ lightColor, darkColor }: ThemedTextProps) {
  
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(true);
  const [trx, setTrx] = useState({
    name: '',
    amount: '',
    description: '',
    date: ''
  })

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
  const { setDisplay } = useContext(TabDisplayContext);
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

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormValues>();

  const handleOnchange = (type: 'expenses' | 'incomes') => {
    if(type === 'expenses') {
      setSelectedExpense(true);
      setSelectedIncome(false);
    } else {
      setSelectedExpense(false);
      setSelectedIncome(true);
    }
  }

  const onChange = (event:DateTimePickerEvent, selectedDate: Date | undefined) => {
    setShow(false);
    selectedDate && setDate(selectedDate);
  };

  const handle = (value: string, name: string) => {
    setTrx({
      ...trx,
      [name]: value,
    });
  }

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    api.post('transactions', {
        name: (data.name).toLowerCase(),
        amount: data.amount,
        description: data.description,
        type_id: selectedExpense ? 2 : 1,
        date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    })
    .then((res) => {
      if (res.data.success) {
          if (selectedExpense) {
            setExpenses([
              ...expenses,
              {
                id: res.data.data.id,
                name: res.data.data.name,
                amount: res.data.data.amount,
                date: res.data.data.date,
                description: res.data.data.description
              }
            ]);
            setTotalExpenses(totalExpenses + parseFloat(res.data.data.amount));
          } else {
            setIncomes([
              ...incomes,
              {
                id: res.data.data.id,
                name: res.data.data.name,
                amount: res.data.data.amount,
                date: res.data.data.date,
                description: res.data.data.description
              }
            ]);
            setTotalIncomes(totalIncomes + parseFloat(res.data.data.amount));
          }
        router.back();
      }
    })
    .catch((err) => {
      alert(err.response.data.message);
    })
    .finally(() => setIsSubmitting(false))
  }

  return (
    <ThemedView style={styles.container}>

        <ThemedView style={styles.header}>

            <ThemedView style={styles.nav} 
              onTouchStart={() => { 
                setDisplay('flex');
                router.back();
              }}
            >
              <ThemeIcon type='ionic' name='chevron-back' size={20} />
              <ThemedText type='button'>Annuler</ThemedText>
            </ThemedView>

            <ThemedText type='defaultSemiBold'>Nouvelle Transaction</ThemedText>
            {isSubmitting ? 
                <Loading /> :
                <ThemedButton 
                  title='Enregistrer'
                  isValid={isValid} 
                  onPress={handleSubmit(onSubmit)} 
                />
            }
        </ThemedView>

        <ThemedView style={styles.content}>
          
          <ThemedText type='link'>Preview</ThemedText>

          <ThemedView style={[styles.previewContainer, { backgroundColor }]}>

            <ThemedView style={styles.preview}>
             
              <ThemedView style={[{ backgroundColor: background }, styles.avatar]}>
                <ThemedText style={[{textTransform: 'uppercase'}, { color }]}>T</ThemedText>
              </ThemedView>

              <ThemedView>
                <ThemedText type='defaultSemiBold' style={styles.breakWord}>{trx.name ? trx.name : 'Title'}</ThemedText>
                <ThemedText type='link' style={{ fontWeight: 100 }}>{date && date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()}</ThemedText>
              </ThemedView>

            </ThemedView>

            <ThemedView>
              <ThemedText type='link' style={{ color: 'red' }}>{trx.amount ? trx.amount : '0.0'} FCFA</ThemedText>
            </ThemedView>

          </ThemedView>

          <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ThemedView style={{rowGap: 5}}>
                <ThemedText type="link" style={{fontWeight: 'bold'}}>Libelle</ThemedText>
                <ThemedView style={[styles.inputContainer, { backgroundColor }]}>
                  <Input
                    value={value}
                    placeholder="Ex: Achat ...."
                    onChangeText={(e) => {
                      onChange(e);
                      handle(e, 'name');
                    }}
                    style={styles.input}
                  />
                </ThemedView>
              </ThemedView>
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <ThemedView style={{rowGap: 5}}>
                <ThemedText type="link" style={{fontWeight: 'bold'}}>Remarque</ThemedText>
                <ThemedView style={[styles.inputContainer, { backgroundColor }]}>
                  <Input
                    value={value}
                    placeholder="Ex: Produit local"
                    onChangeText={(e) => {
                      onChange(e);
                      handle(e, 'description')
                    }}
                    style={styles.input}
                  />
                </ThemedView>
              </ThemedView>
            )}
            name="description"
          />

          <ThemedText type="link" style={{fontWeight: 'bold'}}>Montant & Type</ThemedText>

          <ThemedView style={styles.rowPreview}>

            <ThemedView style={styles.amountPreview}>
              <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedView style={[styles.inputContainer, styles.empty,  { backgroundColor }]}>
                    <ThemeIcon name='dollar' type='found' />
                    <Input
                      value={value}
                      placeholder="0"
                      onChangeText={(e) => {
                        onChange(e);
                        handle(e, 'amount')
                      }}
                      style={styles.input}
                      keyboardType='numeric'
                      type='icon'
                    />
                  </ThemedView>
                )}
                name="amount"
              />
            </ThemedView>

            <ThemedView style={[styles.typePreview, { backgroundColor }]}>
              <RadioButton 
                label='depenses'
                isSelected={selectedExpense}
                onPress={() => handleOnchange('expenses')}
                color={color}
              />
              <RadioButton 
                label='revenus'
                isSelected={selectedIncome}
                onPress={() => handleOnchange('incomes')}
                color={color}
              />
            </ThemedView>

          </ThemedView>

          <ThemedView style={styles.rowPreview}>
            <ThemedText type="link" style={{fontWeight: 'bold'}}>Date</ThemedText>
            <Pressable style={[styles.pressable, { backgroundColor }]} onPress={() => setShow(true)}>
              <ThemedText>{date && date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()}</ThemedText>
            </Pressable>
          </ThemedView>

        </ThemedView>

        {show && (
          <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={onChange}
          />
        )}

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    rowGap: 20,
    //paddingTop: StatusBar.currentHeight
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    rowGap: 10,
    paddingHorizontal: 5    
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  input: {
    borderWidth: 0,
    borderColor: 'transparent',
    padding: 0,
    height: 30,
    width: 'auto'
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  rowPreview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 20
  },
  amountPreview: {
    flex: 1
  },
  typePreview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10
  },
  empty: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  radioButtonContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  radioButton: { 
    height: 20, 
    width: 20, 
    borderRadius: 10, 
    borderWidth: 1, 
    marginRight: 10 
  },
  radioButtonLabel: { 
    fontSize: 16 
  },
  pressable: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  breakWord: {
    maxWidth: 200
  }
});
