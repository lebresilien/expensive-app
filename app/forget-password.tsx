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
        
        <ThemedText type='title' style={{marginTop: 25}}>Mot de passe oublié</ThemedText>

        <ThemedText type='link'>
            Pour récuperer votre mot de passe, entrez notre adresse email.
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
                    placeholder='Email'
                    autoFocus
                    onChangeText={onChange}
                />
            </ThemedView>
            )}
            name="email"
        />

        <TouchableOpacity style={{width: '100%'}}>
            <ThemedView style={styles.next_button}>
                <ThemedText style={styles.textWhite}>
                    Envoyer
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>

        <ThemedView style={styles.account}>
            <ThemedText>Vous avez un compte?</ThemedText>
            <TouchableOpacity onPress={() => router.navigate('/login')}>
                <ThemedText type='link' style={styles.primay_color}>{' '} Se connecter</ThemedText>
            </TouchableOpacity>
        </ThemedView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'column',
    rowGap: 20,
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
    width: '100%'
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  primay_color: {
    color: '#0ea5e9'
  },
});
