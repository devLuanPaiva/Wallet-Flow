import React, { useState, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import useAccount from "../data/hooks/useAccount";
import { AccountI } from "@wallet/core";
import Toast from "react-native-toast-message";

export default function CreateAccount({ navigation }: any) {
    const [transferKey, setTransferKey] = useState<string | undefined>();
    const [initialBalance, setInitialBalance] = useState<number | undefined>();
    const { createAccount } = useAccount();

    // Animated values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;

    const handleSubmit = async () => {
        if (!transferKey || !initialBalance) {
            Toast.show({
                type: "error",
                text1: "Erro ao executar a operação!",
                text2: "Todos os dados devem ser preenchidos!",
            });
            return;
        }

        const newAccount: Partial<AccountI> = {
            transferKey: transferKey,
            bankBalance: initialBalance,
        };
        await createAccount(newAccount)
    };

    // Start animations when the component mounts
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
                Cadastre uma Conta
            </Animated.Text>

            <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
                <Text style={styles.label}>Chave de Transferência</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira a chave de transferência"
                    keyboardType="numeric"
                    onChangeText={(text) => setTransferKey(text)}
                />

                <Text style={styles.label}>Saldo Inicial</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o saldo inicial"
                    keyboardType="numeric"
                    onChangeText={(text) => setInitialBalance(parseFloat(text))}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
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
