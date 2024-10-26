import React, { useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface AnimatedProps {
    children: React.ReactNode;
    title: string
}

export default function AnimatedOperations({ title, children }: Readonly<AnimatedProps>) {
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
        <View>
            <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                {title}
            </Animated.Text>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                {children}
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#340057",
        textAlign: "center",
        marginBottom: 15,
    },
})