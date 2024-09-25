import { createContext, useCallback, useMemo } from "react";
import { AccountContextProps } from "../interfaces";
import useAPI from "../hooks/useAPI";
import useUser from "../hooks/useUser";
import { AccountI, TransactionsI } from "@wallet/core";

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

        } catch (error: any) {
            throw error.message
        }
    }, [httpPOST, user])

    const deposit = useCallback(async (value: number, accountId: number) => {
        try {
            await httpPUT(`account/deposity/${accountId}`, { value: value })

        } catch (error: any) {
            throw error.message
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
            await httpPUT(`account/transfer/${transferKey}`, {
                value: value,
                id: accountId
            }
            )
        } catch (error: any) {
            throw error.message
        }
    }, [httpPUT])

    const getAccountTransactions = useCallback(async function (accountId: number): Promise<TransactionsI[]> {
        try {
            const response = await httpGET(`account/getAccountTransactions/${accountId}`)
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
        } catch (error: any) {
            throw error.message
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