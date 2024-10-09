import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Icon from "../shared/Icon";
import { AccountProps } from "@/src/data/interfaces";
import Transfer from "./Transfer";
import Deposity from "./Deposity";
import ExtractAccount from "./Extract";

export default function Operations({ account }: Readonly<AccountProps>) {
    const [selectedOption, setSelectedOption] = useState<string>("transfer");

    return (
        <View style={styles.sectionOperations}>
            <View style={styles.operations}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedOption === "transfer" && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption("transfer")}
                >
                    <Icon lib="MaterialCommunityIcons" nameIcon="bank-transfer-out" size={55} color="#007AFF" />
                    <Text style={styles.optionText}>Transferir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedOption === "deposit" && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption("deposit")}
                >
                    <Icon lib="MaterialCommunityIcons" nameIcon="bank-transfer-in" size={55} color="#4CAF50" />
                    <Text style={styles.optionText}>Depositar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedOption === "extract" && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedOption("extract")}
                >
                    <Icon lib="MaterialCommunityIcons" nameIcon="bank-transfer" size={55} color="#FF5722" />
                    <Text style={styles.optionText}>Extrato</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.operationDetails}>
                {selectedOption === "transfer" && <Transfer account={account} />}
                {selectedOption === "deposit" && <Deposity account={account} />}
                {selectedOption === "extract" && <ExtractAccount account={account} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionOperations: {
        backgroundColor: "#F5F5F5",
        padding: 20,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        flex: 1,  
    },
    operations: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
        marginTop: 20,
    },
    option: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    optionText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    selectedOption: {
        backgroundColor: "#E0E0E0",
    },
    operationDetails: {
        marginTop: 20,
    },
});

