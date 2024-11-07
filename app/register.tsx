
import { SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import Input from '@/components/Input';
import { useRouter } from 'expo-router';
import { ThemeIcon } from '@/components/ThemeIcon';
import { useContext, useState } from 'react';
import { Loading } from '@/components/Loading';
import api from './lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '@/hooks/userContext';

interface FormValues {
  name: string
  email: string
  password: string
}
export default function RegisterScreen() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUserData } = useContext(UserContext);
    const router = useRouter();

    const {
      control,
      handleSubmit,
      formState: { isValid }
    } = useForm<FormValues>();

    const onSubmit = async(data: FormValues) => {

      setIsSubmitting(true);
      
      api.post('register', {
        name: data.name,
        email: data.email,
        password: data.password
      })
      .then(async (res) => {
        const data = res.data;
        if(data.success) {
          await AsyncStorage.setItem("@token", data.data.token);
          await AsyncStorage.setItem("@name", data.data.name);
          await AsyncStorage.setItem("@email", data.data.email);

          const user = {name: data.data.name, email: data.data.email};
          setUserData(user);

          router.navigate('/(tabs)');
        }          
      })
      .catch((err) => {
        console.log('error', JSON.stringify(err));
      })
      .finally(() => {
        setIsSubmitting(false)
      })
    } 

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
                        minLength: 3
                    }}
                    render={({ field: { onChange, value } }) => (
                        <ThemedView style={styles.empty}>
                          <ThemeIcon name='user' />
                          <Input
                              type='icon'
                              label="Nom"
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
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid address email"
                      }
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
                      minLength: 8
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

                <ThemedView>
                  <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                      <ThemedView style={[styles.next_button, isValid ? styles.bgBlue : styles.gbGray]}>
                        {!isSubmitting ? 
                          <ThemedText style={styles.textWhite}>
                              Créer mon compte
                          </ThemedText>:
                          <Loading size="small" />
                        }
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
      flex: 0.7,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
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
      alignItems: 'center'
    },
    bgBlue: {
      backgroundColor: '#0ea5e9',
    },
    gbGray: {
      backgroundColor: '#e5e7eb',
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
      height: 43
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
  