import { FieldError } from "react-hook-form";
import { TextInput, StyleSheet, TextInputProps, View, Text } from "react-native"

interface CustomInputProps extends TextInputProps {
    label?: string;
    errorMessage?: FieldError;
    type?: 'default' | 'icon'
}
const Input: React.FC<CustomInputProps> = ({ label, errorMessage, type='default', ...props }) => {
    return (
        <>
            {type === 'default' ?
                <View style={styles.container}>
                    {label && <Text style={styles.label}>{label}</Text>}
                    <TextInput
                        // @ts-ignore
                        style={[styles.input, errorMessage && styles.inputError]}
                        selectionColor='#0ea5e9'
                        {...props}
                    />
                    {errorMessage && <Text style={styles.error}>Ce champ est obligatoire</Text>}
                </View>
                :
                <View style={styles.container}>
                    <TextInput
                        // @ts-ignore
                        style={[styles.inputIcon, errorMessage && styles.inputError]}
                        selectionColor='#0ea5e9'
                        {...props}
                    />
                    {errorMessage && <Text style={styles.error}>Ce champ est obligatoire</Text>}
                </View>
            }
        </>
    );
  };

const styles = StyleSheet.create({
    container: {
        gap: 1,
        marginVertical: 10
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        borderColor: '#0ea5e9',
    },
    inputIcon: {
        width: 200,
        fontSize: 16,
        marginLeft: 5
    },
    label: {
        fontWeight: '600'
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
    },
});

export default Input;