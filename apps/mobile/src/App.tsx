import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './screens/Landing'
const Stack = createNativeStackNavigator()
export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Landing' component={Landing} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}