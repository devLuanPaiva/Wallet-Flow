import Transfer from "@/src/components/account/Transfer";
import useAccount from "@/src/data/hooks/useAccount";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { AccountProps } from "@/src/data/interfaces";

jest.mock('@/src/data/hooks/useAccount');

describe('Transfer Component', () => {
    const mockTransfer = jest.fn();

    beforeEach(() => {
        (useAccount as jest.Mock).mockReturnValue({
            deposit: mockTransfer,
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
        }
        const { getByText } = render(<Transfer account={accountProps} />);
        expect(getByText('Transferir Dinheiro')).toBeTruthy();
        expect(getByText('Chave de Transferência')).toBeTruthy();
        expect(getByText('Valor da Transferência')).toBeTruthy();
        expect(getByText('Transferir')).toBeTruthy();
    });
})