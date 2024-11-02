
import { SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import Input from '@/components/Input';
import { useRouter } from 'expo-router';
import { ThemeIcon } from '@/components/ThemeIcon';
import { Colors } from '@/constants/Colors';
import { useContext, useState } from 'react';
import api from './lib/api';
import { UserContext } from '@/hooks/userContext';
import { Loading } from '@/components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormValues {
  email: string;
  password: string;
}
export default function LoginScreen() {

    const [showPassword, setShowPassword] = useState(false);
    const { setUserData } = useContext(UserContext);
    const router = useRouter();

    const {
      control,
      handleSubmit,
      formState: { isSubmitting, isValid }
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
      api.post('login', {
        email: data.email,
        password: data.password
      })
        .then(async (res) => {
          //console.log('uuuuuuuuuuuuuuuuuu', res.data.data.token);
          const data = res.data.data;
          if(res.data.success) {
            await AsyncStorage.setItem("@token", data.token);
            await AsyncStorage.setItem("@name", data.name);
            await AsyncStorage.setItem("@email", data.email);

            const user = {name: data.name, email: data.email};
            setUserData(user);

            router.navigate('/(tabs)');
          }
        })
        .catch((err) => {
          //console.error('message', JSON.stringify(err))
          Alert.alert('Identifiants de connexion vqlise');
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

            <ThemedText type='defaultSemiBold'>Se connecter</ThemedText>
            
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

            <ThemedView style={styles.forgot_password}>
              <TouchableOpacity onPress={() => router.navigate("/forget-password")}>
                <ThemedText type='link'>Mot de passe oublié?</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <ThemedView style={[styles.next_button, isValid ? styles.bgBlue : styles.gbGray]}>
                  {!isSubmitting ? 
                    <ThemedText style={styles.textWhite}>
                      Connexion
                    </ThemedText>:
                    <Loading size="small" />
                  }
                </ThemedView>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.account}>
              <ThemedText type='link'>Vous n'avez pas de compte?</ThemedText>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <ThemedText type='link' style={styles.primay_color}>{' '} s'enregistrer</ThemedText>
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
      paddingTop: StatusBar.currentHeight
    },
    header: {
      flex: 0.7,
      flexDirection: 'column',
      alignItems: 'center'
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
    textWhite: {
      color: 'white'
    },
    bgBlue: {
      backgroundColor: '#0ea5e9',
    },
    gbGray: {
      backgroundColor: '#e5e7eb',
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
  