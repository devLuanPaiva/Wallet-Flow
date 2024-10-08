import useAccount from "@/src/data/hooks/useAccount";
import { AccountProps } from "@/src/data/interfaces";
import React, { useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Deposity({ account }: Readonly<AccountProps>) {
    const [valueDeposity, setValueDeposity] = useState<number | null>(null);
    const { deposit } = useAccount();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;

    const handleSubmit = async () => {
        await deposit(valueDeposity!, account?.id!)
    };

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, []);
   
    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                Depositar Dinheiro
            </Animated.Text>

            <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
                <Text style={styles.label}>Valor do Depósito</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o valor"
                    keyboardType="numeric"
                    onChangeText={(text) => setValueDeposity(parseFloat(text))}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Depositar</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#340057",
        textAlign: "center",
        marginVertical: 20,
    },
    form: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        backgroundColor: "#4B0082",
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
});
