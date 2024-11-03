import { SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useLocalSearchParams  } from 'expo-router';
import { useRef, useState } from 'react';

export default function OTP() {

    const router = useRouter();
    const params = useLocalSearchParams();
    const { email } = params;
    const [otp, setOtp] = useState(['', '', '', '']); // Array to store OTP digits
    const inputRefs = useRef([]); // Refs for each input field
    console.log('jhhh', email);
    alert(email)
      // Handle text change
  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text; // Update the corresponding index

    setOtp(newOtp);

    // Move to the next input if a digit is entered and we're not at the last field
    if (text && index < otp.length - 1) {
      //@ts-ignore
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyPress = (nativeEvent: any , index: number) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '') {
      // Move to the previous input if backspace is pressed and input is empty
      if (index > 0) {
        //@ts-ignore
        inputRefs.current[index - 1].focus();
      }
    }
  };


  return (
    <SafeAreaView style={styles.container}>
        
      <ThemedView style={styles.titleBlock}>
        <ThemedText type='title'>Confirmation</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>

        <ThemedText type='link'>
          Renseignez le code que vous avez reçu par mail pour renitialiser votre mot de passe
        </ThemedText>

        <ThemedView style={styles.inputContainer}>
          {otp.map((_, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={otp[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              //@ts-ignore
              ref={(ref) => (inputRefs.current[index] = ref)} // Assign refs to inputs
            />
          ))}
        </ThemedView>

        <TouchableOpacity style={styles.full} onPress={() => router.navigate('/otp')}>
            <ThemedView style={styles.next_button}>
                <ThemedText style={styles.textWhite}>
                    Envoyer
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>

      </ThemedView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'column',
    rowGap: 20,
    paddingHorizontal: 10
  },
  content: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20
  },
  full: {
    width: '100%'
  },
  titleBlock: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#0ea5e9',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  otpText: {
    marginTop: 20,
    fontSize: 16,
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
});
