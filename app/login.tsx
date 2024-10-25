
import { SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useForm, Controller } from "react-hook-form";
import Input from '@/components/Input';
import { useRouter } from 'expo-router';

interface FormValues {
  username: string;
  password: string;
}
export default function LoginScreen() {

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

            <ThemedText type='defaultSemiBold'>Expensive-App</ThemedText>
            
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                  <Input
                      label="Email"
                      value={value}
                      onChangeText={onChange}
                  />
              )}
              name="username"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                  <Input
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
              )}
              name="password"
            />

            <ThemedView style={styles.forgot_password}>
              <TouchableOpacity onPress={() => router.replace("/")}>
                <ThemedText type='link'>Mot de passe oublié?</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView>
              <TouchableOpacity>
                <ThemedView style={styles.next_button}>
                  <ThemedText style={styles.textWhite}>
                    Connexion
                  </ThemedText>
                </ThemedView>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.account}>
              <ThemedText type='link'>Vous n'avez pas de compte?</ThemedText>
              <TouchableOpacity onPress={() => router.navigate('/register')}>
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
      flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 100,
      width: 100,
      bottom: 0,
      left: 0,
      borderRadius: 50
    },
    form: {
      flex: 2,
      rowGap: 10,
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
    }
});
  