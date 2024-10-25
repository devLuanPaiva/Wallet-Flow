import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import AccountTransfer from "../src/components/account/AccountTransfer";
import { AccountProvider } from "../src/data/contexts/AccountContext";
import useAccount from "../src/data/hooks/useAccount";
import { AccountProps } from "../src/data/interfaces";
import "@testing-library/jest-dom"

jest.mock('../src/data/hooks/useAccount')
describe('AccountTransfer Component', () => {
    const mockTransfer = jest.fn()
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
    beforeEach(() => {
        (useAccount as jest.Mock).mockReturnValue({ transfer: mockTransfer })
        jest.spyOn(window, 'alert').mockImplementation(() => { })
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should render the transfer form', () => {
        render(
            <AccountProvider>
                <AccountTransfer account={accountProps} />
            </AccountProvider>
        )
        expect(screen.getByText('Realizar Transferência'))
        expect(screen.getByPlaceholderText('Valor')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Chave de Transferência')).toBeInTheDocument()
        expect(screen.getByText('Transferir')).toBeInTheDocument()
    })
})