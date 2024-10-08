import Deposity from "@/src/components/account/Deposity";
import useAccount from "@/src/data/hooks/useAccount";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { AccountProps } from "@/src/data/interfaces";

jest.mock('@/src/data/hooks/useAccount');

describe('Deposity Component', () => {
    const mockDeposit = jest.fn();

    beforeEach(() => {
        (useAccount as jest.Mock).mockReturnValue({
            deposit: mockDeposit,
        });
    });
    
    const accountProps: AccountProps['account'] = {
        id: 1,
        transferKey: '1234567890',
        bankBalance: 1000,
        user: {
            id: 1,
            email: 'test@email.com',
        },
    };
    it('should render correctly', () => {
        const { getByText } = render(<Deposity account={accountProps} />);
        expect(getByText('Depositar Dinheiro')).toBeTruthy();
        expect(getByText('Valor do Depósito')).toBeTruthy();
        expect(getByText('Depositar')).toBeTruthy();
    });

    it('should call deposit function with correct parameters', async () => {
        const { getByPlaceholderText, getByText } = render(<Deposity account={accountProps} />);

        fireEvent.changeText(getByPlaceholderText('Insira o valor'), '100.50');
        fireEvent.press(getByText('Depositar'));

        await waitFor(() => {
            expect(mockDeposit).toHaveBeenCalledWith(100.50, 1);
        });
    });

    it('should show success message on successful deposit', async () => {
        const { getByPlaceholderText, getByText } = render(<Deposity account={accountProps} />);

        fireEvent.changeText(getByPlaceholderText('Insira o valor'), '200.00');
        fireEvent.press(getByText('Depositar'));

        await waitFor(() => {
            expect(mockDeposit).toHaveBeenCalledWith(200.00, 1);
            expect(mockDeposit).toHaveBeenCalledTimes(2);
        });
    });

    it('should show error message on failed deposit', async () => {
        const { getByPlaceholderText, getByText } = render(<Deposity account={accountProps} />);

        fireEvent.changeText(getByPlaceholderText('Insira o valor'), '300.00');
        fireEvent.press(getByText('Depositar'));

        mockDeposit.mockImplementationOnce(() => {
            throw new Error('Erro no depósito');
        });

        await waitFor(() => {
            expect(mockDeposit).toHaveBeenCalledWith(300.00, 1);
        });
    });
});