import AccountDeposity from "../src/components/account/AccountDeposity";
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import useAccount from "../src/data/hooks/useAccount";
import { AccountProvider } from "../src/data/contexts/AccountContext";
import { AccountProps } from "../src/data/interfaces";
import "@testing-library/jest-dom"

jest.mock('../src/data/hooks/useAccount')
describe('AccountDeposity Component', () => {
    const mockDeposity = jest.fn()
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
        (useAccount as jest.Mock).mockReturnValue({
            deposit: mockDeposity,
        })
        jest.spyOn(window, 'alert').mockImplementation(() => { })
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should render the deposit form', () => {
        render(
            <AccountProvider>
                <AccountDeposity account={accountProps} />
            </AccountProvider>
        )
        expect(screen.getByText('Realizar Depósito')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Valor')).toBeInTheDocument()
        expect(screen.getByText('Depositar')).toBeInTheDocument()
    })
    it('should handle successful deposit', async () => {
        mockDeposity.mockResolvedValueOnce({})
        render(
            <AccountProvider>
                <AccountDeposity account={accountProps} />
            </AccountProvider>
        )
        const input = screen.getByPlaceholderText('Valor')
        const button = screen.getByText('Depositar')

        fireEvent.change(input, { target: { value: '500' } })
        fireEvent.click(button)

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)

        await waitFor(() => expect(screen.getByText('Sucesso')).toBeInTheDocument())

        await waitFor(() => {
            expect(mockDeposity).toHaveBeenCalledWith(500, 1)

        })
    })

    it('should show error message', async () => {
        mockDeposity.mockRejectedValueOnce(new Error("Deve existir algum valor para ser depositado!"))
        render(
            <AccountProvider>
                <AccountDeposity account={accountProps} />
            </AccountProvider>
        )
        const input = screen.getByPlaceholderText('Valor')
        const depositButton = screen.getByText('Depositar')

        fireEvent.change(input, { target: { value: '0' } })
        fireEvent.click(depositButton)

        const confirmButton = await screen.findByText('Confirmar')
        fireEvent.click(confirmButton)
        await waitFor(() => expect(screen.getByText('Erro')).toBeInTheDocument())
        expect(screen.getByText("Deve existir algum valor para ser depositado!")).toBeInTheDocument()
    })
})
