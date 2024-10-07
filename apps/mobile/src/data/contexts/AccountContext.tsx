import { createContext, useCallback, useMemo } from "react";
import { AccountContextProps } from "../interfaces";
import useAPI from "../hooks/useAPI";
import useUser from "../hooks/useUser";
import { AccountI, TransactionsI } from "@wallet/core";
import Toast from 'react-native-toast-message';

export const AccountContext = createContext({} as AccountContextProps)
export function AccountProvider({ children, }: { readonly children: React.ReactNode; }) {
    const { user } = useUser()
    const { httpGET, httpPOST, httpPUT } = useAPI()

    const fetchAccount = useCallback(async (): Promise<AccountI> => {
        try {
            const response = await httpGET(`account/searchAccount/user/${user!.id}`)
            return response
        } catch (error: any) {
            throw error.message
        }
    }, [httpGET, user])

    const searchAccountKey = useCallback(
        async function (transferKey: bigint): Promise<AccountI> {
            try {
                const response = await httpGET(`account/search/${transferKey}`)
                return response

            } catch (error: any) {
                throw error.message
            }
        }, [httpGET]
    )

    const createAccount = useCallback(async (account: Partial<AccountI>) => {
        if (!user) return
        try {
            await httpPOST('account/register', {
                user: user,
                transferKey: account.transferKey?.toString(),
                bankBalance: account.bankBalance,
            })

            Toast.show({
                type: 'success',
                text1: 'Registro bem-sucedido!',
                text2: 'Conta registrada com sucesso.',
            });


        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro no registro',
                text2: error.message,
            });
        }
    }, [httpPOST, user])

    const deposit = useCallback(async (value: number, accountId: number) => {
        try {
            await httpPUT(`account/deposity/${accountId}`, { value: value })

            Toast.show({
                type: 'success',
                text1: 'Depósito bem-sucedido!',
                text2: `Você realizou um depósito de ${value.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                })}.`,
            });

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro no depósito',
                text2: error.message,
            });
        }
    }, [httpPUT])

    const checkBalance = useCallback(async function (id: number): Promise<number> {
        try {
            const response = await httpGET(`account/balance/${id}`)
            return response
        } catch (error: any) {
            throw error.message
        }
    }, [httpGET])

    const transfer = useCallback(async (value: number, accountId: number, transferKey: bigint) => {
        try {
            await httpPUT(`account/transfer/${transferKey}`,
                {
                    value: value,
                    id: accountId
                }
            )

            Toast.show({
                type: 'success',
                text1: 'Transferência bem-sucedida!',
                text2: `Você realizou uma transferência de ${value.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                })}.`,
            })

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro na transferência',
                text2: error.message,
            });
        }
    }, [httpPUT])

    const getAccountTransactions = useCallback(async function (account: Partial<AccountI>): Promise<TransactionsI[]> {
        try {
            const response = await httpGET(`account/getAccountTransactions/${account.id}/${account.transferKey}`)
            return response;
        } catch (error: any) {
            throw error.message
        }
    }, [httpGET])

    const reverse = useCallback(async (transactionId: number, reversed: boolean) => {
        try {
            await httpPUT(`account/reversalOperation`, {
                transactionId: transactionId,
                reversed: reversed,
            })

            Toast.show({
                type: 'success',
                text1: 'Operação reversada com sucesso!',
                text2: 'A operação foi revertida com sucesso.',
            });

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao reverter operação',
                text2: error.message,
            });
        }
    }, [httpPUT])

    const contextValue = useMemo(() => {
        return {
            searchAccountKey,
            deposit,
            createAccount,
            checkBalance,
            transfer,
            fetchAccount,
            reverse,
            getAccountTransactions,
        }
    }, [deposit, searchAccountKey, createAccount, checkBalance, transfer, fetchAccount, reverse, getAccountTransactions])

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    )
}