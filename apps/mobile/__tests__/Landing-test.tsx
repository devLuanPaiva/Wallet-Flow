import { render } from '@testing-library/react-native';
import Landing from '../src/screens/Landing';

const mockedNavigate = jest.fn();
jest.mock('expo-linear-gradient', () => ({
    LinearGradient: ({ children }: any) => children,
}));


describe('Landing screen', () => {
    test('Test renders correctly on Landing', () => {
        const { getByText } = render(<Landing navigation={{ navigate: mockedNavigate }} />);
        getByText('Bem-vindo ao Wallet Flow!');
    });
});
