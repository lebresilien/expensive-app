import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import { ThemeIcon } from '@/components/ThemeIcon';
import Input from '@/components/Input';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Loading } from '@/components/Loading';
import api from './lib/api';

interface FormValues {
    password: string
    confirm: string
}

export default function ForgetPassword() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const params = useLocalSearchParams();
    const { code } = params;

    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
      api.post('password/reset', {
        password: data.password,
        password_confirmation: data.confirm,
        code: code
      })
      .then((res) => {
        if(res.data.success) {
          router.push({ pathname: '/login', 
            params: {
              reset: '1'
            } 
          })
        } else {
          Alert.alert('Une erreur innattendue est survenue');
        }
      })
      .catch((err) => {
        Alert.alert( err.response.data.message);
      })
    }

  return (
    <SafeAreaView style={styles.container}>
        
        <ThemedText type='title' style={{marginTop: 25}}>renitialisez votre Mot passe</ThemedText>

        <ThemedText type='link'>
            Renseignez votre nouveau mot de passe et confirmer le
        </ThemedText>

        <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, value } }) => (
            <ThemedView style={styles.empty}>
                <ThemedView style={styles.viewPassword}>
                    <ThemeIcon name='lock' type='ant'/>
                    <Input
                        type='icon'
                        label="Password"
                        value={value}
                        placeholder='Mot de passe'
                        autoFocus
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

        <TouchableOpacity style={{width: '100%'}} onPress={handleSubmit(onSubmit)}>
            <ThemedView style={[styles.next_button, isValid ? styles.bgBlue : styles.gbGray]}>
              {!isSubmitting ?
                <ThemedText style={styles.textWhite}>
                    Renitialiser
                </ThemedText>:
                <Loading size="small" />
              }
            </ThemedView>
        </TouchableOpacity>

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
  viewPassword: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center'  
  },
  bgBlue: {
    backgroundColor: '#0ea5e9',
  },
  gbGray: {
    backgroundColor: '#e5e7eb',
  }
});
