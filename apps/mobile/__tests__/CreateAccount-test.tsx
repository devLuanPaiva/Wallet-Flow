import CreateAccount from "@/src/screens/CreateAccount";
import useAccount from "@/src/data/hooks/useAccount";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock('@/src/data/hooks/useAccount');

describe("CreateAccount Component", () => {
    const mockCreateAccount = jest.fn();
    beforeEach(() => {
        (useAccount as jest.Mock).mockReturnValue({
            transfer: mockCreateAccount,
        });
    });
    
    it('should render correctly', () => {
        const { getByText } = render(<CreateAccount />);
        expect(getByText('Cadastre uma Conta')).toBeTruthy();
        expect(getByText('Chave de Transferência')).toBeTruthy();
        expect(getByText('Saldo Inicial')).toBeTruthy();
        expect(getByText('Criar Conta')).toBeTruthy();
    });

})