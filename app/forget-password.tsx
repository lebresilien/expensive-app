import { Link, Stack } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import { ThemeIcon } from '@/components/ThemeIcon';
import Input from '@/components/Input';
import { useRouter } from 'expo-router';

interface FormValues {
    email: string
}

export default function ForgetPassword() {

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { isValid, isDirty }
    } = useForm<FormValues>();

  return (
    <SafeAreaView style={styles.container}>
        
        <ThemedText type='title'>Mot de passe oublié</ThemedText>

        <ThemedText type='subtitle'>
            Pour récuperer  votre mot de passe, entrer notre adresse email.
            Nous vous enverons un code par mail
        </ThemedText>

        <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, value } }) => (
            <ThemedView style={styles.empty}>
                <ThemeIcon name='email' />
                <Input
                type='icon'
                label="Email"
                value={value}
                onChangeText={onChange}
                />
            </ThemedView>
            )}
            name="email"
        />

        <TouchableOpacity>
            <ThemedView style={styles.next_button}>
                <ThemedText style={styles.textWhite}>
                    Envoyer
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>

        <ThemedView style={styles.account}>
            <ThemedText type='link'>Vous avez un compte?</ThemedText>
            <TouchableOpacity onPress={() => router.navigate('/login')}>
            <ThemedText type='link' style={styles.primay_color}>{' '} se connecter</ThemedText>
            </TouchableOpacity>
        </ThemedView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'column',
    rowGap: 10,
    paddingHorizontal: 10
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  empty: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0ea5e9',
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 43,
  },
  next_button: {
    width: '100%',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#0ea5e9',
    alignItems: 'center'
  },
  textWhite: {
    color: 'white'
  },
  account: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primay_color: {
    color: '#0ea5e9'
  },
});
