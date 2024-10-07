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
        const { getByText } = render(<Deposity account={accountProps} />);
        expect(getByText('Depositar Dinheiro')).toBeTruthy();
        expect(getByText('Valor do Depósito')).toBeTruthy();
        expect(getByText('Depositar')).toBeTruthy();
    });

    
});