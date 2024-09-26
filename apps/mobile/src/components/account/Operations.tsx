import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "../shared/Icon";

export default function Operations({ navigation }: any) {
    return (
        <View style={styles.operations}>
            <TouchableOpacity style={styles.option}>
                <Icon lib="MaterialCommunityIcons" nameIcon="bank-transfer-out" size={55} color="#007AFF"/>
                <Text style={styles.optionText}>Transferir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
                <Icon lib="MaterialCommunityIcons" nameIcon="bank-transfer-in" size={55} color="#4CAF50"/>
                <Text style={styles.optionText}>Depositar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
                <Icon lib="MaterialCommunityIcons" nameIcon="bank-transfer" size={55} color="#FF5722"/>
                <Text style={styles.optionText}>Extrato</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
        borderRadius: 15,
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
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    }
});
