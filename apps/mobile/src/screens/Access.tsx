import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useUser from "../data/hooks/useUser";
import useFormUser from "../data/hooks/useFormUser";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ConfirmationModal from "../components/shared/Modal";

export default function Access({ navigation }: any) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [mode, setMode] = useState<'access' | 'register'>('access');
    const { user } = useUser()
    const { email, setEmail, password, setPassword, name, setName, errors, registerUser, loginUser } = useFormUser()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            navigation.replace('Main')
        }
    }, [user])
    const handleRegister = () => {
        registerUser()
        setIsModalVisible(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.title}>💰 Wallet Flow 💰</Text>
                <Text style={styles.description}>
                    Gerencie suas finanças de maneira inteligente e segura. Cadastre-se para começar!
                </Text>
                <View style={styles.form}>
                    {mode === 'register' && (
                        <View style={styles.boxInput}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                style={[styles.input, errors.name ? styles.inputError : null]}
                                placeholder="Digite seu nome"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={setName}
                            />
                            {errors.name ? (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            ) : null}
                        </View>
                    )}
                    <View style={styles.boxInput}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#999"
                            value={email.toLowerCase()}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        {errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}
                    </View>

                    <View style={styles.boxInput}>
                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, errors.password ? styles.inputError : null]}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <Pressable
                                style={styles.eyeButton}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <Ionicons
                                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#f3f3f3"
                                />
                            </Pressable>
                        </View>
                        {errors.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        ) : null}
                    </View>

                </View>
                <Pressable style={styles.button} onPress={mode === 'access' ? loginUser : () => setIsModalVisible(true)}>
                    <Text style={styles.buttonText}>{mode === 'access' ? 'Entrar' : 'Cadastrar'}</Text>
                </Pressable>

                <Pressable onPress={() => setMode(mode === 'access' ? 'register' : 'access')}>
                    <Text style={styles.textButton}>
                        {mode === 'access' ? 'Ainda não tem conta? Cadastre-se!' : 'Já tem conta? Entre na plataforma!'}
                    </Text>
                </Pressable>
                <ConfirmationModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onConfirm={handleRegister}
                    title="Confirmação"
                    message="Você confirma o cadastro dos seus dados?"
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                />
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1f1b2e",
        justifyContent: 'center'
    },
    boxInput: {
        marginBottom: 15,
        width: "100%",
    },
    label: {
        color: "#fff",
        alignSelf: "flex-start",
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        width: "100%",
        minWidth: 280,
        height: 40,
        backgroundColor: "#2e2a42",
        borderRadius: 5,
        paddingHorizontal: 10,
        color: "#fff",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
    },
    errorText: {
        color: "red",
    },
    button: {
        width: "40%",
        height: 40,
        backgroundColor: "#a78bfa",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    textButton: {
        color: "#a0aec0",
        fontSize: 16,
        marginTop: 10,
        alignSelf: "center",
    },
    imagemDeFundo: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    form: {
        width: "70%",
        paddingTop: 40,
        columnGap: 10,
    },
    logo: {
        marginTop: 20,
        marginBottom: 20,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#ccc",
        textAlign: "center",
        marginBottom: 20,
        marginHorizontal: 20,
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    eyeButton: {
        marginLeft: -40,
        paddingHorizontal: 10,
    },
});
