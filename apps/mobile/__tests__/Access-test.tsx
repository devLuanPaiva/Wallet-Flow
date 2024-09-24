import { render, waitFor, fireEvent } from '@testing-library/react-native';
import Access from "../src/screens/Access";
import { SectionProvider } from '../src/data/contexts/SectionContext';
import { UserProvider } from '../src/data/contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Mock do Toast
jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
}));

// Mock do hook useAPI
jest.mock('../src/data/hooks/useAPI', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        httpPOST: jest.fn().mockResolvedValue({}), // Mock de httpPOST que resolve sem erros
    })),
}));

describe('Access Screen', () => {
    const mockShowToast = Toast.show;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render Access screen', () => {
        const { getByText } = render(
            <NavigationContainer>
                <UserProvider>
                    <Access />
                </UserProvider>
            </NavigationContainer>
        );

        getByText('Gerencie suas finanças de maneira inteligente e segura. Cadastre-se para começar!');
    });

    test('should register a new user and show success toast', async () => {
        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <UserProvider>
                    <SectionProvider>
                        <Access />
                    </SectionProvider>
                </UserProvider>
            </NavigationContainer>
        );

        fireEvent.press(getByText('Ainda não tem conta? Cadastre-se!'));
        fireEvent.changeText(getByPlaceholderText('Digite seu nome'), 'Joana Doe');
        fireEvent.changeText(getByPlaceholderText('Digite seu e-mail'), 'joanadoe123@gmail.com');
        fireEvent.changeText(getByPlaceholderText('Digite sua senha'), '#Senha123');

        fireEvent.press(getByText('Cadastrar'));

        // Verifica se o toast de sucesso foi chamado corretamente
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith({
                type: 'success',
                text1: 'Registro bem-sucedido!',
                text2: 'Você se registrou com sucesso.',
            });
        });
    });
});
