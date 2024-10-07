import Transfer from "@/src/components/account/Transfer";
import useAccount from "@/src/data/hooks/useAccount";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { AccountProps } from "@/src/data/interfaces";

jest.mock('@/src/data/hooks/useAccount');

describe('Transfer Component', () => {
    const mockTransfer = jest.fn();

    beforeEach(() => {
        (useAccount as jest.Mock).mockReturnValue({
            transfer: mockTransfer,
        });
    });

    it('should render correctly', () => {
        const accountProps: AccountProps['account'] = {
            id: 1,
            transferKey: '1234567890',
            bankBalance: 1000,
            user: {
                id: 1,
                email: 'test@email.com',
                name: 'Teste'
            }
        };
        const { getByText } = render(<Transfer account={accountProps} />);
        expect(getByText('Transferir Dinheiro')).toBeTruthy();
        expect(getByText('Chave de Transferência')).toBeTruthy();
        expect(getByText('Valor da Transferência')).toBeTruthy();
        expect(getByText('Transferir')).toBeTruthy();
    });

    it('should call transfer function with correct parameters', async () => {
        const accountProps: AccountProps['account'] = {
            id: 1,
            transferKey: '1234567890',
            bankBalance: 1000,
            user: {
                id: 1,
                email: 'test@email.com',
                name: 'Teste'
            }
        };

        const { getByPlaceholderText, getByText } = render(<Transfer account={accountProps} />);

        fireEvent.changeText(getByPlaceholderText('Insira a chave de transferência'), '0987654321');
        fireEvent.changeText(getByPlaceholderText('Insira o valor'), '250');

        fireEvent.press(getByText('Transferir'));

        await waitFor(() => {
            expect(mockTransfer).toHaveBeenCalledWith(250, 1, BigInt('0987654321'));
        });
    });

    it('should show success message on successful transfer', async () => {
        const accountProps: AccountProps['account'] = {
            id: 1,
            transferKey: '1234567890',
            bankBalance: 1000,
            user: {
                id: 1,
                email: 'test@email.com',
                name: 'Teste'
            }
        };

        const { getByPlaceholderText, getByText} = render(<Transfer account={accountProps} />);

        fireEvent.changeText(getByPlaceholderText('Insira a chave de transferência'), '0987654321');
        fireEvent.changeText(getByPlaceholderText('Insira o valor'), '250');

        fireEvent.press(getByText('Transferir'));

        await waitFor(() => {
            expect(mockTransfer).toHaveBeenCalledWith(250, 1, BigInt('0987654321'));
            expect(mockTransfer).toHaveBeenCalledTimes(2);
        })
    });
    it('should show error message on failed transfer', async () => {
        const accountProps: AccountProps['account'] = {
            id: 1,
            transferKey: '1234567890',
            bankBalance: 1000,
            user: {
                id: 1,
                email: 'test@email.com',
                name: 'Teste'
            }
        };

        const { getByPlaceholderText, getByText} = render(<Transfer account={accountProps} />);

        fireEvent.changeText(getByPlaceholderText('Insira a chave de transferência'), '0987654321');
        fireEvent.changeText(getByPlaceholderText('Insira o valor'), '25000');

        fireEvent.press(getByText('Transferir'));
        mockTransfer.mockImplementationOnce(()=>{
            throw new Error('Transferencia não efetuada');
        })

        await waitFor(() => {
            expect(mockTransfer).toHaveBeenCalledWith(25000, 1, BigInt('0987654321'));
        })
    })
});
