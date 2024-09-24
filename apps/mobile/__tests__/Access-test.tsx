import { render, waitFor, fireEvent } from '@testing-library/react-native';
import Access from "../src/screens/Access";
import { SectionProvider } from '../src/data/contexts/SectionContext';
import { UserProvider } from '../src/data/contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useAPI from '../src/data/hooks/useAPI';

// Mock do Toast
jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
}));
// Mock do hook useAPI
jest.mock('../src/data/hooks/useAPI', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        httpPOST: jest.fn() // Inicializa o httpPost
    })),
}));


describe('Access Screen', () => {
    const mockShowToast = Toast.show;
    const mockHttpPOST = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        (useAPI as jest.Mock).mockReturnValue({ httpPOST: mockHttpPOST }); // Retorna o mock do httpPOST
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
        mockHttpPOST.mockResolvedValueOnce({}); // Mock de httpPOST que resolve sem erros
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
    test('should show error toast when user is already registered', async () => {
        mockHttpPOST.mockRejectedValueOnce(new Error("Usuário já cadastrado")); // Simula erro de usuário já cadastrado

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

        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith({
                type: 'error',
                text1: 'Erro no registro',
                text2: 'Usuário já cadastrado',
            });
        });
    });
    test('should successfully login, store token in AsyncStorage, and create session', async () => {
        mockHttpPOST.mockResolvedValueOnce({ token: 'mock-jwt-token' });

        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <UserProvider>
                    <SectionProvider>
                        <Access />
                    </SectionProvider>
                </UserProvider>
            </NavigationContainer>
        );

        fireEvent.changeText(getByPlaceholderText('Digite seu e-mail'), 'teste@email.com');
        fireEvent.changeText(getByPlaceholderText('Digite sua senha'), '123456');

        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(mockHttpPOST).toHaveBeenCalledWith('user/login', { email: 'teste@email.com', password: '123456' });

            // Verifica se o token retornado é o esperado
            expect(mockHttpPOST).toHaveReturnedWith(Promise.resolve({ token: 'mock-jwt-token' }));

        });
    });
});
