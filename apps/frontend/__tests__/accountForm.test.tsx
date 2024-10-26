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
    it('should create account', async () => {
        mockCreateAccount.mockResolvedValueOnce({})
        render(
            <AccountProvider>
                <AccountForm />
            </AccountProvider>
        )
        const inputTransferKey = screen.getByPlaceholderText('Chave de Transferência')
        fireEvent.change(inputTransferKey, { target: { value: accountSubmit.transferKey } })
        const inputInitialBalance = screen.getByPlaceholderText('Saldo Inicial')
        fireEvent.change(inputInitialBalance, { target: { value: accountSubmit.bankBalance } })
        fireEvent.click(screen.getByText('Cadastrar'))

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)

        await waitFor(() => expect(screen.getByText('Sucesso')).toBeInTheDocument())
        expect(mockCreateAccount).toHaveBeenCalledWith({ "bankBalance": 1000, "transferKey": "1234567890" })
    })
    it('should show error when the key length is different from ten', async () => {
        mockCreateAccount.mockRejectedValueOnce(new Error("A chave de transferência deve ter exatamente 10 dígitos."))
        render(
            <AccountProvider>
                <AccountForm />
            </AccountProvider>
        )
        const inputTransferKey = screen.getByPlaceholderText('Chave de Transferência')
        fireEvent.change(inputTransferKey, { target: { value: '1234' } })
        const inputInitialBalance = screen.getByPlaceholderText('Saldo Inicial')
        fireEvent.change(inputInitialBalance, { target: { value: accountSubmit.bankBalance } })
        fireEvent.click(screen.getByText('Cadastrar'))

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)

        await waitFor(() => expect(screen.getByText('Erro')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(/a chave de transferência deve ter exatamente 10 dígitos/i)).toBeInTheDocument())

    })
})