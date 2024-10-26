import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { AccountProvider } from "../src/data/contexts/AccountContext";
import AccountForm from "../src/components/account/AccountForm";
import useAccount from "../src/data/hooks/useAccount";
import "@testing-library/jest-dom"
import { AccountI } from "@wallet/core";

jest.mock('../src/data/hooks/useAccount')
describe('AccountForm Component', () => {
    const mockCreateAccount = jest.fn()
    const accountSubmit: AccountI = {
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
        (useAccount as jest.Mock).mockReturnValue({
            createAccount: mockCreateAccount
        })
        jest.spyOn(window, 'alert').mockImplementation(() => { })
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the account form', () => {
        render(
            <AccountProvider>
                <AccountForm />
            </AccountProvider>
        )
        expect(screen.getByText('Registrar Conta')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Chave de Transferência')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Saldo Inicial')).toBeInTheDocument()
        expect(screen.getByText('Cadastrar')).toBeInTheDocument()
    })
})