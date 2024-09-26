import { AccountProps } from "@/src/data/interfaces";
import { StyleSheet, Text, View, Animated } from "react-native";
import Icon from "../shared/Icon";
import { useEffect, useRef } from "react";

export default function Balance({ account }: Readonly<AccountProps>) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500, 
            useNativeDriver: true, 
        }).start();
    }, [animatedValue]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0], 
    });

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Saldo</Text>
                <View style={styles.percentageContainer}>
                    <Icon lib="Feather" nameIcon="arrow-up-right" color="#4CAF50" size={24} />
                    <Text style={styles.percentage}>1.33%</Text>
                </View>
            </View>
            <Animated.Text style={[styles.balance, { transform: [{ translateY }] }]}>
                {account.bankBalance.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                })}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 4,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    percentageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    percentage: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4CAF50",
        marginLeft: 5,
    },
    balance: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
        marginTop: 10,
    },
});
