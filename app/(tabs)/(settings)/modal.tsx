import Input from '@/components/Input';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabDisplayContext } from '@/hooks/useTabDisplay';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, StatusBar, Pressable } from 'react-native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import api from '@/app/lib/api';
import { Loading } from '@/components/Loading';
import { GoalContext } from '@/hooks/useGoal';

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

interface FormValues {
    name: string
    amount: string
    expiredAt: string
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export default function Modal({ lightColor, darkColor}: ThemedTextProps) {
   
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { setDisplay } = useContext(TabDisplayContext);
    const { goals, setGoals } = useContext(GoalContext);
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
    
    const cancel = () => {
        setDisplay('flex');
        router.back();
    }

    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm<FormValues>();

    const onChange = (event:DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShow(false);
        selectedDate && setDate(selectedDate);
    };

    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);
        api.post('goals', {
            name: (data.name).toLowerCase(),
            amount: data.amount,
            expiredAt: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        })
        .then((res) => {
            if(res.data.success) {
                setGoals([
                    ...goals,
                    {
                        id: res.data.data.id,
                        name: res.data.data.name,
                        amount: res.data.data.amount,
                        expiredAt: res.data.data.expiredAt,
                        savingAmount: 0, 
                    }
                ]) 
                router.back();
            }
        })
        .catch((err) => {
            console.log('err', err)
            alert(err.response.data.message);
        })
        .finally(() => setIsSubmitting(false))
    }

  return (
    <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
            <ThemedButton type='cancel' title='Annuler' onPress={cancel} />
            {isSubmitting ? 
                <Loading /> :
                <ThemedButton 
                    title='Enregistrer' 
                    isValid={isValid} 
                    onPress={handleSubmit(onSubmit)} 
                />
            }
        </ThemedView>

        <ThemedText type='defaultSemiBold'>Ajouter un nouvel objectif</ThemedText>

        <ThemedView style={[{ backgroundColor }, styles.form]}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        value={value}
                        placeholder="Libelle de l'objectif"
                        autoFocus
                        onChangeText={onChange}
                        style={styles.input}
                    />
                )}
                name="name"
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        value={value}
                        placeholder="Montant"
                        onChangeText={onChange}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                )}
                name="amount"
            />
            <ThemedView style={styles.containerDate}>
                <ThemedText>Deadline</ThemedText>
                <Pressable style={styles.pressable} onPress={() => setShow(true)}>
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
    justifyContent: 'space-between',
    marginTop: 5
  },
  form: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  input: {
    borderWidth: 0,
    borderColor: 'transparent',
    padding: 0
  },
  containerDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pressable: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#d4d4d4'
  },
});