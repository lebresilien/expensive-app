import { Link, Stack } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import { ThemeIcon } from '@/components/ThemeIcon';
import Input from '@/components/Input';
import { useRouter } from 'expo-router';
import { useState } from 'react';

interface FormValues {
    password: string
    confirm: string
}

export default function ForgetPassword() {

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

        <TouchableOpacity style={{width: '100%'}} onPress={() => router.navigate('/otp')}>
            <ThemedView style={styles.next_button}>
                <ThemedText style={styles.textWhite}>
                    Renitialiser
                </ThemedText>
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
  viewPassword: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center'  
  }
});
