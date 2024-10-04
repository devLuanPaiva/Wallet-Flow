import useAccount from "@/src/data/hooks/useAccount";
import { AccountProps } from "@/src/data/interfaces";
import { TransactionsI } from "@wallet/core";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, FlatList, StyleSheet, Text, View } from "react-native";

export default function ExtractAccount({ account }: Readonly<AccountProps>) {
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsI[]>([]);
    const { getAccountTransactions } = useAccount();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;

    useEffect(() => {
        async function loadTransactions() {
            try {
                if (account?.id) {
                    const fetchedTransactions = await getAccountTransactions(account.id);
                    if (Array.isArray(fetchedTransactions)) {
                        setTransactions(fetchedTransactions);
                    } else {
                        setTransactions([]);
                    }
                }
            } catch (error) {
                setTransactions([]);
            } finally {
                setLoadingTransactions(false);
            }
        }
        loadTransactions();
    }, [getAccountTransactions, account]);

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

    if (loadingTransactions) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#340057" />
            </View>
        );
    }

    const renderItem = ({ item }: any) => (
        <View style={styles.transactionCard}>
            <Text style={styles.transactionType}>
                {item.type === 'DEPOSIT' ? 'Depósito' : 'Transferência'}
            </Text>
            <Text style={styles.transactionValue}>
                {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
        </View>
    );

    return transactions ? (
        <View style={styles.container}>
            <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                Extrato Bancário
            </Animated.Text>

            <Animated.View style={[styles.transactionsContainer, { opacity: fadeAnim }]}>
                <FlatList
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id!.toString()}
                />
            </Animated.View>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#340057",
        textAlign: "center",
        marginVertical: 20,
    },
    transactionsContainer: {
        flex: 1,
        marginTop: 10,
    },
    transactionCard: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    transactionType: {
        fontSize: 16,
        fontWeight: "500",
        color: "#340057",
    },
    transactionValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#27AE60",
        marginTop: 5,
    },
});
