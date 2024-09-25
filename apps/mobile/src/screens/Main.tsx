import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../components/shared/Icon";
import Home from "./Home";
import Extract from "./Extract";

const Tab = createBottomTabNavigator();

export default function Main({ navigation }: any) {
    const tab = (name: string, component: any, label: string, icon: string) => {
        return (
            <Tab.Screen
                name={name}
                component={component}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabScreen}>
                            <Icon
                                nameIcon={icon as any}
                                size={24}
                                color={focused ? "#8A2BE2" : "#9370DB"} 
                            />
                            <Text
                                style={{
                                    ...styles.tabScreenText,
                                    color: focused ? "#8A2BE2" : "#9370DB", 
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                    ),
                }}
            />
        );
    };

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: "#4B0082", 
                tabBarInactiveBackgroundColor: "#4B0082", 
                tabBarStyle: {
                    backgroundColor: "#4B0082", 
                },
            }}>
            {tab("Home", Home, "Início", "home-outline")}
            {tab("Extract", Extract, "Extrato", "FontAwesome6")}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabScreen: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tabScreenText: {
        fontSize: 10,
    },
});
