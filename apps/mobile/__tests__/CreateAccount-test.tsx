import CreateAccount from "@/src/screens/CreateAccount";
import useAccount from "@/src/data/hooks/useAccount";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock('@/src/data/hooks/useAccount');

describe("CreateAccount Component", () => {
    const mockCreateAccount = jest.fn();

    beforeEach(() => {
        (useAccount as jest.Mock).mockReturnValue({
            createAccount: mockCreateAccount
        });
    });

    it('should render correctly', () => {
        const { getByText } = render(<CreateAccount />);
        expect(getByText('Cadastre uma Conta')).toBeTruthy();
        expect(getByText('Chave de Transferência')).toBeTruthy();
        expect(getByText('Saldo Inicial')).toBeTruthy();
        expect(getByText('Criar Conta')).toBeTruthy();
    });

    it('should call createAccount with the correct data', async () => {
        const { getByPlaceholderText, getByText } = render(<CreateAccount />);

        fireEvent.changeText(getByPlaceholderText('Insira a chave de transferência'), '1234567890');
        fireEvent.changeText(getByPlaceholderText('Insira o saldo inicial'), '1000');

        fireEvent.press(getByText('Criar Conta'));

        await waitFor(() => {
            expect(mockCreateAccount).toHaveBeenCalledWith({
                transferKey:'1234567890',
                bankBalance: 1000,
            });
        });
    });
});
