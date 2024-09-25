import { ReactNode, useEffect } from "react"
import useSection from "../hooks/useSection"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ActivityIndicator, View } from "react-native"

type RootStackParamList = {
    Access: undefined
}
interface ChildrenPops {
    children: ReactNode

}

export default function RequireAuth({ children }: Readonly<ChildrenPops>) {
    const { user, loading } = useSection()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    useEffect(() =>{
        if(!loading && !user){
            navigation.navigate('Access')
        }
    }, [loading, navigation, user])

    if(loading){
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#340057" />
            </View>
        )
    }

}