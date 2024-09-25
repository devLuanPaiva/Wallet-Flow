import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './screens/Landing'
import Access from './screens/Access'
import { SectionProvider } from './data/contexts/SectionContext'
import { UserProvider } from './data/contexts/UserContext'
import Toast from 'react-native-toast-message'
import { AccountProvider } from './data/contexts/AccountContext'
const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <>
            <NavigationContainer>
                <SectionProvider>
                    <UserProvider>
                        <AccountProvider>
                            <Stack.Navigator initialRouteName='Home'>
                                <Stack.Screen
                                    name='Landing' component={Landing}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name='Access'
                                    component={Access}
                                    options={{ headerShown: false }}
                                />
                            </Stack.Navigator>
                        </AccountProvider>
                    </UserProvider>
                </SectionProvider>
            </NavigationContainer>
            <Toast/>
        </>
    )
}