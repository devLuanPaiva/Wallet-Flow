import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { TransactionsI } from "@wallet/core";
import useAccount from "@/src/data/hooks/useAccount";
import Icon from "../shared/Icon";
import { AccountProps } from "@/src/data/interfaces";
import AnimatedOperations from "../shared/AnimatedOperations";

export default function ExtractAccount({ account }: Readonly<AccountProps>) {
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsI[]>([]);
    const { getAccountTransactions, reverse } = useAccount();
    const reverseTransactions = true;

    useEffect(() => {
        async function loadTransactions() {
            try {
                const fetchedTransactions = await getAccountTransactions(account);
                if (Array.isArray(fetchedTransactions)) {
                    setTransactions(fetchedTransactions);
                } else {
                    setTransactions([]);
                }
            } catch (error) {
                setTransactions([]);
            } finally {
                setLoadingTransactions(false);
            }
        }
        loadTransactions();
    }, [getAccountTransactions, account]);

    const handleReverseTransaction = async (transactionId: number) => {
        try {
            if (transactionId !== undefined) {
                await reverse(transactionId, reverseTransactions);
                setTransactions((prevTransactions) =>
                    prevTransactions.map((transaction) =>
                        transaction.id === transactionId
                            ? { ...transaction, reversed: !transaction.reversed }
                            : transaction
                    )
                );
            }
        } catch (error) {
            console.error(`${error}`);
        }
    };

    const renderItem = (item: TransactionsI) => (
        <View style={styles.transactionCard} key={item.id!.toString()}>
            <View style={styles.iconContainer}>
                <View
                    style={[
                        styles.iconBackground,
                        item.type === "DEPOSIT" ? styles.depositBackground : styles.withdrawBackground,
                    ]}
                >
                    <Icon
                        lib="AntDesign"
                        nameIcon={item.type === "DEPOSIT" ? "caretup" : "caretdown"}
                        color="#FFF"
                        size={20}
                    />
                </View>
                <Text style={styles.transactionType}>
                    {item.type === 'DEPOSIT' ? 'Depósito' : 'Transferência'}
                </Text>
            </View>

            <Text style={styles.transactionValue}>
                {item.value!.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>

            <TouchableOpacity
                style={[styles.reverseButton, item.reversed ? styles.reversedButton : styles.notReversedButton]}
                onPress={() => handleReverseTransaction(item.id!)}
                disabled={item.reversed}
            >
                <Text style={styles.reverseButtonText}>
                    {item.reversed ? 'Revertido' : 'Reverter'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (loadingTransactions) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#340057" />
            </View>
        );
    }

    return transactions ? (
        <AnimatedOperations title="Extrato Bancário">
            <ScrollView style={styles.scrollView}>
                {transactions.map((transaction) => renderItem(transaction))}
            </ScrollView>
        </AnimatedOperations>
    ) : null;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        flex: 1,
    },

    transactionCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: "100%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    iconBackground: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    depositBackground: {
        backgroundColor: "#4CAF50",
    },
    withdrawBackground: {
        backgroundColor: "#E74C3C",
    },
    transactionType: {
        fontSize: 12,
        marginTop: 5,
        color: "#340057",
        fontWeight: "500",
    },
    transactionValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#27AE60",
    },
    reverseButton: {
        padding: 8,
        borderRadius: 3,
    },
    reversedButton: {
        backgroundColor: "#E74C3C",
    },
    notReversedButton: {
        backgroundColor: "#3498DB",
    },
    reverseButtonText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "bold",
    },
});
