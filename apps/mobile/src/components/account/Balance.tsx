import { AccountProps } from "@/src/data/interfaces";
import { StyleSheet, Text, View, Animated } from "react-native";
import Icon from "../shared/Icon";
import { useEffect, useRef } from "react";
import { FormatPixKey } from '@wallet/ui';

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

    const formattedPixKey = FormatPixKey.format(account.transferKey.toString());

    return (
        <View style={styles.card}>
            <View style={styles.balanceContainer}>
                <Animated.Text style={[styles.balance, { transform: [{ translateY }] }]}>
                    {account.bankBalance.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Animated.Text>
                <Text style={styles.pixKey}>
                    <Icon lib="MaterialIcons" nameIcon="pix" color="#4CAF50" size={20} />
                    {' '}{formattedPixKey}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,

    },
    balanceContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    balance: {
        fontSize: 34,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 5,
        fontFamily: "Roboto",
    },
    pixKey: {
        fontSize: 22,
        color: '#a0aec0',
        marginBottom: 20,
        fontFamily: "Roboto",
        fontWeight: "400",
        
    },
});
