import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import { ErrorContainerProps } from "@/src/data/interfaces";

export default function ErrorContainer({ error, navigation }: Readonly<ErrorContainerProps>) {
    return (
        <View style={styles.errorContainer}>
            <Icon color="#340057" lib="MaterialCommunityIcons" nameIcon="bank-off" size={70} />
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={styles.createAccountButtonText}>Criar Conta</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3f3f3",
    },
    errorText: {
        fontSize: 24,
        color: "#D72638",
        marginTop: 20,
        fontWeight: "bold",
    },
    errorMessage: {
        fontSize: 16,
        color: "#8A8A8A",
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 20,
    },
    createAccountButton: {
        marginTop: 30,
        backgroundColor: "#340057",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    createAccountButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
})