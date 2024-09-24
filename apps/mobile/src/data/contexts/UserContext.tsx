import Toast from 'react-native-toast-message';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { UserContextProps } from '../interfaces';
import { createContext, useCallback, useMemo } from 'react';
import useAPI from '../hooks/useAPI';
import useSection from '../hooks/useSection';
import { UserI } from '@wallet/core';

type RootStackParamList = {
  Register: undefined;
};
const UserContext = createContext<UserContextProps>({} as any);
export function UserProvider({ children }: any) {
  const { httpPOST } = useAPI()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { clearSection, createSection, loading, user } = useSection()
  const register = useCallback(async (user: UserI) => {
    try {
      await httpPOST('user/register', user);
      Toast.show({
        type: 'success',
        text1: 'Registro bem-sucedido!',
        text2: 'Você se registrou com sucesso.',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro no registro',
        text2: error.message,
      });
    }
  }, [httpPOST])
  const login = useCallback(async (user: Partial<UserI>) => {
    try {
      const token = await httpPOST('user/login', user);
      createSection(token);

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro de Autenticação',
        text2: error.message,
      })
    }
  }, [createSection, httpPOST]);

  const logout = useCallback(() => {
    navigation.navigate("Register");
    clearSection();
  }, [clearSection, navigation]);

  const contextValue = useMemo(() => {
    return {
      loading,
      user,
      login,
      register,
      logout,
    };
  }, [loading, user, login, register, logout]);
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;