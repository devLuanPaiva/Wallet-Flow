import { AccountProps } from "@/src/data/interfaces";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";

export default function Balance({ account }: Readonly<AccountProps>) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Saldo</Text>
                <View style={styles.percentageContainer}>
                    <Icon lib="Feather" nameIcon="arrow-up-right" color="#4CAF50" size={24} />
                    <Text style={styles.percentage}>1.33%</Text>
                </View>
            </View>
            <Text style={styles.balance}>
                {account.bankBalance.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                })}
            </Text>
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
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
