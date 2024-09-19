import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Landing({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>
                    Bem-vindo ao{' '}
                    <LinearGradient
                        colors={['#7F00FF', '#E100FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientText}
                    >
                        <Text style={styles.gradientTextContent}>Wallet Flow!</Text>
                    </LinearGradient>
                </Text>
                <Text style={styles.subtitle}>
                    Sua jornada financeira começa aqui. Acesse a página de autenticação para continuar.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AuthPage')}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
    },
    main: {
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    gradientText: {
        paddingVertical: 4,
    },
    gradientTextContent: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 16,
        textAlign: 'center',
        color: '#666',
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});