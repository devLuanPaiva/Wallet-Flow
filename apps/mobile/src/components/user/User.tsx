import { AccountProps } from "@/src/data/interfaces";
import React, { useRef } from "react";
import { Animated, Easing, Text, View, StyleSheet } from "react-native";

export default function UserData({ account }: Readonly<AccountProps>) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;

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
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                <Text style={styles.title}>Olá, {account.user.name}!</Text>
                <Text style={styles.text}>Aqui está o seu saldo atual.</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontFamily: "Roboto",
        fontWeight: "600",
    },
    text: {
        fontSize: 22,
        color: '#a0aec0',
        marginBottom: 20,
        fontFamily: "Roboto",
        fontWeight: "400",
    },
});
