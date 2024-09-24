import { render, waitFor, fireEvent } from '@testing-library/react-native'
import Access from "../src/screens/Access";
import fetchMock from 'jest-fetch-mock'
import { SectionProvider } from '../src/data/contexts/SectionContext';
import { UserProvider } from '../src/data/contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';

describe('UserContext and SectionContext Integration', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    test('should render Access screen and handle login', () => {
        const { getByText } = render(
            <NavigationContainer>
                <UserProvider>
                    <Access />
                </UserProvider>
            </NavigationContainer>
        );

        getByText('Gerencie suas finanças de maneira inteligente e segura. Cadastre-se para começar!');
    });
})
