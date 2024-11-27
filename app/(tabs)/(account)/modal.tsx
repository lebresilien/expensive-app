import api from "@/app/lib/api";
import Input from "@/components/Input";
import { Loading } from "@/components/Loading";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UserContext } from "@/hooks/userContext";
import { TabDisplayContext } from "@/hooks/useTabDisplay";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet } from "react-native";

type ThemedTextProps = {
    lightColor?: string;
    darkColor?: string;
};

interface FormValues {
    name: string
}

export default function AccountScreen({ lightColor, darkColor}: ThemedTextProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'contentBackground');
    const { setDisplay } = useContext(TabDisplayContext);
    const { 
        expensiveCategories, 
        incomeCategories, 
        setExpensiveCategories, 
        setIncomeCategories 
    } = useContext(UserContext);

    const params = useLocalSearchParams();
    const { type } = params;
    
    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {

        setIsSubmitting(true);

        api.post('categories', {
            name: data.name,
            type_id: type === 'depenses' ? 2 : 1
        })
        .then((res) => {
            alert(res.data.message);
            if(type === 'depenses') {
                const item = [...expensiveCategories];
                item.push({
                    id: res.data.data.id,
                    name: res.data.data.name
                });
                setExpensiveCategories(item);
            } else {
                const item = [...incomeCategories];
                item.push({
                    id: res.data.data.id,
                    name: res.data.data.name
                });
                setIncomeCategories(item);
            }
        })
        .catch((err) => alert(err.response.data.message))
        .finally(() => setIsSubmitting(false))
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <ThemedView style={styles.header}>
                
                <ThemedButton 
                    type='cancel' 
                    title='Annuler' 
                    onPress={() => {
                        setDisplay('flex');
                        router.back();
                    }} 
                />

                {isSubmitting ? 
                    <Loading /> :
                    <ThemedButton 
                        title='Enregistrer' 
                        isValid={isValid} 
                        onPress={handleSubmit(onSubmit)} 
                    />
                }

            </ThemedView>

            <ThemedText type='defaultSemiBold'>Ajouter une Catégorie de { type }</ThemedText>

            <ThemedView style={[{ backgroundColor }, styles.form]}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            value={value}
                            placeholder={type === "depenses" ?  "Ex: Location" : "Ex: Salaire" }
                            onChangeText={onChange}
                            style={styles.input}
                        />
                    )}
                    name="name"
                />
            </ThemedView>            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      rowGap: 30
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
});