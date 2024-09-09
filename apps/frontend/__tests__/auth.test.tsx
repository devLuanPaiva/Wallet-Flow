import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import UserForm from "../src/components/user/UserForm";
import useUser from '../src/data/hooks/useUser';
import { useRouter, useSearchParams } from 'next/navigation';
import '@testing-library/jest-dom'

jest.mock('../src/data/hooks/useUser');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(() => ({
        get: jest.fn() 
    }))
}))

describe('UserForm Component', () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        // Mocking useUser hook
        (useUser as jest.Mock).mockReturnValue({
            user: null,
            login: mockLogin,
            register: mockRegister,
            push: mockPush
        });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the login form correctly', () => {
        render(<UserForm />);

        expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    });

    it('switches to the register form and submits registration', async () => {
        render(<UserForm />);

        // Use findByText to wait for the text to appear
        const registerButton = await screen.findByText(/Cadastre-se!/i);
        fireEvent.click(registerButton);

        expect(screen.getByPlaceholderText(/Nome/i)).toBeInTheDocument();
        expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
        
        fireEvent.change(screen.getByPlaceholderText(/Nome/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'Senha123#' } });

        await act(async () => {
            fireEvent.click(screen.getByText(/Cadastrar/i));
        });

        expect(mockRegister).toHaveBeenCalledWith({
            email: 'john@example.com',
            password: 'Senha123#',
            name: 'John'
        });
    });
});
