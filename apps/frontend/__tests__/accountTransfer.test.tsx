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
    it('should handle successful transfer', async () => {
        mockTransfer.mockResolvedValueOnce({})
        render(
            <AccountProvider>
                <AccountTransfer account={accountProps} />
            </AccountProvider>
        )
        fireEvent.change(screen.getByPlaceholderText('Valor'), { target: { value: '200' } })
        fireEvent.change(screen.getByPlaceholderText('Chave de Transferência'), { target: { value: '0987654321' } })
        fireEvent.click(screen.getByText('Transferir'))

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)

        await waitFor(() => expect(screen.getByText('Sucesso')).toBeInTheDocument())

        await waitFor(() => {
            expect(mockTransfer).toHaveBeenCalledWith(200, 1, '0987654321')
        })
    })
    it('should show error message when some data was not sent', async () => {
        mockTransfer.mockRejectedValueOnce(new Error("Todos os dados devem ser preenchidos."))
        render(
            <AccountProvider>
                <AccountTransfer account={accountProps} />
            </AccountProvider>
        )
        fireEvent.change(screen.getByPlaceholderText('Valor'), { target: { value: '2000' } })
        fireEvent.change(screen.getByPlaceholderText('Chave de Transferência'), { target: { value: '0987654321' } })
        fireEvent.click(screen.getByText('Transferir'))

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)

        await waitFor(() => expect(screen.getByText('Erro')).toBeInTheDocument())

        await waitFor(() => {
            expect(screen.getByText(/todos os dados devem ser preenchidos/i)).toBeInTheDocument()
        })
    })

    it('should show error message when balance insufficient', async () => {
        mockTransfer.mockRejectedValueOnce(new Error("Saldo insuficiente"))
        render(
            <AccountProvider>
                <AccountTransfer account={accountProps} />
            </AccountProvider>
        )
        fireEvent.click(screen.getByText('Transferir'))

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)

        await waitFor(() => expect(screen.getByText('Erro')).toBeInTheDocument())

        await waitFor(() => {
            expect(screen.getByText(/saldo insuficiente/i)).toBeInTheDocument()
        })
    })
})