import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, StatusBar, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import api from '@/app/lib/api';
import { Loading } from '@/components/Loading';
import { ThemedView } from '@/components/ThemedView';
import ThemedButton from '@/components/ThemedButton';
import { TabDisplayContext } from '@/hooks/useTabDisplay';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Input from '@/components/Input';
import { GoalContext } from '@/hooks/useGoal';

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

interface FormValues {
    amount: string
    expiredAt: string
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


export default function ModalSaving({ lightColor, darkColor }: ThemedTextProps) {
   
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setDisplay } = useContext(TabDisplayContext);
    const { current, setCurrent } = useContext(GoalContext);
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');

    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm<FormValues>();

    const onChange = (event:DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShow(false);
        selectedDate && setDate(selectedDate);
    };

    const cancel = () => {
        setDisplay('flex');
        router.back();
    }

    const onSubmit = (data: FormValues) => {

        setIsSubmitting(true);

        api.post('savings', {
            goal_id: current?.id,
            amount: data.amount,
            day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        })
        .then((res) => {
            if(res.data.success) {

                //const copyValue = [...goals];

                if(current) {

                    const copyCurrent = current;
                    copyCurrent.savings.push({
                        'amount': res.data.data.amount,
                        'day': res.data.data.day
                    })
                    copyCurrent.savingAmount = parseInt(current.savingAmount.toString()) + parseInt(res.data.data.amount);
                    setCurrent(copyCurrent);
                    router.back();
                   /*  let item = goals.find((item) => parseInt(item.id) === parseInt(current.id.toString()));
                    
                    if(item) {
                        item.savingAmount = parseInt(current.savingAmount.toString()) + parseInt(res.data.data.amount);
                        item.savings.push({
                            'amount': res.data.data.amount,
                            'day': res.data.data.day
                        })
                        setGoals(copyValue);
                        console.log('udud', current)
                        router.back();
                    } */
                }
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

            <ThemedText type='defaultSemiBold'>Ajouter une économie</ThemedText>

            <ThemedView style={[{ backgroundColor }, styles.form]}>
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
    )
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