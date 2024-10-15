import useAccount from "@/src/data/hooks/useAccount";
import { AccountProps } from "@/src/data/interfaces";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AnimatedOperations from "../shared/AnimatedOperations";
import ConfirmationModal from "../shared/Modal";
export default function Deposity({ account }: Readonly<AccountProps>) {
    const [valueDeposity, setValueDeposity] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { deposit } = useAccount();
    const handleSubmit = async () => {
        await deposit(valueDeposity!, account?.id!)
        setIsModalVisible(false)
    };
    return (
        <AnimatedOperations title="Depositar Dinheiro">
            <View style={styles.form}>
                <Text style={styles.label}>Valor do Depósito</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o valor"
                    keyboardType="numeric"
                    onChangeText={(text) => setValueDeposity(parseFloat(text))}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.buttonText}>Depositar</Text>
                </TouchableOpacity>
            </View>
            <ConfirmationModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={handleSubmit}
                title="Confirmação"
                message={`Você confirma o depósito de ${valueDeposity ? valueDeposity.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                }) : 'R$0,00'} ?`}
                confirmText="Confirmar"
                cancelText="Cancelar"
            />
        </AnimatedOperations>
    )
}
const styles = StyleSheet.create({
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
