
import { SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import Input from '@/components/Input';
import { useRouter } from 'expo-router';
import { ThemeIcon } from '@/components/ThemeIcon';
import { useState } from 'react';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirm: string
}
export default function RegisterScreen() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const {
      control,
      handleSubmit,
      formState: { isValid, isDirty }
    } = useForm<FormValues>();

    return (
        <SafeAreaView style={styles.container}>
       
          <ThemedView style={styles.header}>
            <Image
              source={require('@/assets/images/react-logo.png')}
              style={styles.logo}
            />
            <ThemedText type='defaultSemiBold'>Expensive-App</ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>

            <ThemedText type='defaultSemiBold'>S'enregistrer</ThemedText>
            
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <ThemedView style={styles.empty}>
                          <ThemeIcon name='user' />
                          <Input
                              type='icon'
                              label="Email"
                              value={value}
                              placeholder='Nom(s) et Prénom(s)'
                              autoFocus
                              onChangeText={onChange}
                          />
                        </ThemedView>
                    )}
                    name="name"
                />

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
                              onChangeText={onChange}
                          />
                        </ThemedView>
                    )}
                    name="email"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <ThemedView style={styles.empty}>
                          <ThemedView style={styles.viewPassword}>
                              <ThemeIcon name='lock' type='ant' />
                              <Input
                                type='icon'
                                label="Password"
                                value={value}
                                placeholder='Mot de passe'
                                onChangeText={onChange}
                                secureTextEntry={showPassword ? false : true}
                              />
                          </ThemedView>
                          <ThemeIcon name={showPassword ? 'eye' : 'eye-off'} type='ionic' onPress={() => setShowPassword(!showPassword)} />
                        </ThemedView>
                    )}
                    name="password"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <ThemedView style={styles.empty}>
                          <ThemedView style={styles.viewPassword}>
                              <ThemeIcon name='lock' type='ant' />
                              <Input
                                type='icon'
                                label="Password"
                                value={value}
                                placeholder='Confirmez votre mot de passe'
                                onChangeText={onChange}
                                secureTextEntry={showPassword ? false : true}
                              />
                          </ThemedView>
                          <ThemeIcon name={showConfirmPassword ? 'eye' : 'eye-off'} type='ionic' onPress={() => setShowPassword(!showConfirmPassword)} />
                        </ThemedView>
                    )}
                    name="confirm"
                />

                <ThemedView>
                <TouchableOpacity>
                    <ThemedView style={styles.next_button}>
                    <ThemedText style={styles.textWhite}>
                        Créer mon compte
                    </ThemedText>
                    </ThemedView>
                </TouchableOpacity>
                </ThemedView>

            <ThemedView style={styles.account}>
              <ThemedText type='link'>Vous avez deja un compte?</ThemedText>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <ThemedText type='link' style={styles.primay_color}>{' '} Se connecter</ThemedText>
              </TouchableOpacity>
            </ThemedView>

          </ThemedView>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
      rowGap: 20
    },
    header: {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    logo: {
      height: 100,
      width: 100
    },
    form: {
      flex: 2,
      rowGap: 20,
      flexDirection: 'column',
      paddingHorizontal: 10
    },
    forgot_password: {
      alignItems: 'flex-end',
      marginTop: 5
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
    empty: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#0ea5e9',
      borderRadius: 50,
      paddingHorizontal: 10,
      height: 43,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
    },
    viewPassword: {
      flex: 10,
      flexDirection: 'row',
      alignItems: 'center'  
    }
});
  