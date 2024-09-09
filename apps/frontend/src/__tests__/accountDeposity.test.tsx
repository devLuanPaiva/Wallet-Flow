import AccountDeposity from "../components/account/AccountDeposity";
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import useAccount from "../data/hooks/useAccount";
import { AccountProvider } from "../data/contexts/AccountContext";
import { AccountProps } from "../data/interfaces";
import "@testing-library/jest-dom"

jest.mock('../data/hooks/useAccount')
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
        expect(screen.getByText('Realizar Deposito')).toBeInTheDocument()
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
        await waitFor(() => {
            expect(mockDeposity).toHaveBeenCalledWith(500, 1)

        })
    })
    
})
