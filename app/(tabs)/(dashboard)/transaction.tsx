import { StyleSheet, TouchableOpacity, Text, View, Alert, StatusBar } from 'react-native';
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

type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
};

interface FormValues {
  name: string
  amount: string,
  description: string,
  date: string
}

const RadioButton = ({ label, isSelected, onPress, color }: {label: string, isSelected: boolean, onPress: () => void, color: string}) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
    <View style={[styles.radioButton, isSelected && { backgroundColor: color }, { borderColor: color }]} />
    <Text style={styles.radioButtonLabel}>{label}</Text>
  </TouchableOpacity>
);
export default function Transaction({ lightColor, darkColor }: ThemedTextProps) {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(true);

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
  const background = useThemeColor({ light: lightColor, dark: darkColor }, 'inactiveTint');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

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

  return (
    <ThemedView style={styles.container}>

        <ThemedView style={styles.header}>

            <ThemedView style={styles.nav} onTouchStart={() => router.back()}>
              <ThemeIcon type='ionic' name='chevron-back' size={20} />
              <ThemedText type='button'>Annuler</ThemedText>
            </ThemedView>

            <ThemedText type='defaultSemiBold'>Nouvelle Transaction</ThemedText>
            {isSubmitting ? 
                <Loading /> :
                <ThemedButton 
                    title='Enregistrer' 
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

              <ThemedView /* style={styles.itemPreview} */>
                <ThemedText type='defaultSemiBold'>Title</ThemedText>
                <ThemedText type='link' style={{ fontWeight: 100 }}>14,Nov 2024</ThemedText>
              </ThemedView>

            </ThemedView>

            <ThemedView>
              <ThemedText type='link' style={{ color: 'red' }}>0.0 FCFA</ThemedText>
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
                    onChangeText={onChange}
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
                    placeholder="Produit local"
                    onChangeText={onChange}
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
                      onChangeText={onChange}
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

        </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    rowGap: 20,
    paddingTop: StatusBar.currentHeight
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
    padding: 10,
    borderRadius: 10
  },
  empty: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  radioButtonContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
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
});
