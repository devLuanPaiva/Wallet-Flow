import useUser from "@/src/data/hooks/useUser";
import { AccountProps } from "@/src/data/interfaces";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View, StyleSheet } from "react-native";
import Icon from "../shared/Icon";

export default function UserData({ account }: Readonly<AccountProps>) {
    const { logout } = useUser();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;

    useEffect(() => {
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
            <Icon nameIcon="user" lib="AntDesign" size={40} color="#00ffea" />
            <Text style={styles.greeting}>Olá, {account.user.name}</Text>
            <Text style={styles.email}>{account.user.email}</Text>
            <Pressable onPress={logout} style={styles.logoutButton}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <Icon nameIcon="logout" lib="SimpleLineIcons" size={20} color="#ff006e"/>
                    <Text style={styles.logoutText}>Sair</Text>
                </Animated.View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#0a0f24',
        borderRadius: 15,
        borderColor: '#00ffea', 
        borderWidth: 1,
        shadowColor: '#00ffea',
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
    },
    greeting: {
        fontSize: 22,
        color: '#f4faff',
        fontWeight: '600',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: '#a0aec0',
        marginBottom: 20,
    },
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2c44',
        paddingVertical: 10,
        borderRadius: 10,
    },
    logoutText: {
        fontSize: 16,
        color: '#ff006e', 
        fontWeight: 'bold',
    },
});
