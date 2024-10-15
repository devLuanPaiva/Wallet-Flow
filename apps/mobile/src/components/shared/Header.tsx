import React, { useState } from "react";
import useUser from "@/src/data/hooks/useUser";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Icon from "./Icon";

export default function Header() {
    const { logout } = useUser();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>WALLET FLOW</Text>
            <Pressable onPress={toggleDropdown} style={styles.menuButton}>
                {dropdownVisible ? <Icon nameIcon="menu-unfold" lib="AntDesign" color="#fff" size={24} /> : <Icon nameIcon="menu-fold" lib="AntDesign" color="#fff" size={24} />}
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <Pressable onPress={logout} style={styles.logoutButton}>
                            <Icon nameIcon="logout" lib="SimpleLineIcons" size={20} color="#ff006e" />
                            <Text style={styles.logoutText}>Sair</Text>
                        </Pressable>
                    </View>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "900",
        fontFamily: "Roboto",
    },
    menuButton: {
        position: "relative",
    },
    dropdown: {
        position: "absolute",
        top: 40,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        zIndex: 1000,
        elevation: 5,
        pointerEvents: "auto",
    },
    logoutButton: {
        width: 50,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1001,
        elevation: 6,
        pointerEvents: "auto",
        cursor: "pointer"
    },
    logoutText: {
        marginLeft: 5,
        color: "#ff006e",
        fontSize: 16,
    },
});
