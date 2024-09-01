import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AccountContextProps } from "../interfaces";
import useUser from "../hooks/useUser";
import useAPI from "../hooks/useApi";
import { AccountI } from "@wallet/core";

export const AccountContext = createContext({} as AccountContextProps)
export function AccountProvider({ children, }: { readonly children: React.ReactNode; }) {
    const { entity } = useUser()
    const { httpGET, httpPOST, httpPUT } = useAPI()
    const [account, setAccount] = useState<AccountI>()

    const searchAccountKey = useCallback(
        async function (transferKey: number): Promise<AccountI> {
            try {
                const response = await httpGET(`account/search/${transferKey}`)
                setAccount(response.data)
                return response.data

            } catch (error) {
                console.error('Erro ao carregar conta: ', error)
                throw error
            }
        }, [httpGET]
    )
    useEffect(() => {
        if (entity?.account?.transferKey) {
            searchAccountKey(entity.account.transferKey)
        }
    }, [entity, searchAccountKey])

    const createAccount = useCallback(async (account: AccountI) => {
        if (!entity) return
        try {
            await httpPOST('account/register', {
                user: entity.id,
                transferKey: account.transferKey,
                bankBalance: account.bankBalance,
            })

        } catch (error) {
            console.error('Erro ao cadastrar conta: ', error)
            throw error
        }
    }, [httpPOST, entity])

    const deposit = useCallback(async (value: number, accountId: number) => {
        try {
            await httpPUT(`account/deposit/${accountId}`, { value: value })

        } catch (error) {
            console.error('Erro ao depositar dinheiro: ', error)
            throw error
        }
    }, [httpPUT])

    const checkBalance = useCallback(async function (id: number): Promise<number> {
        try {
            const response = await httpGET(`account/balance/${id}`)
            return response.data
        } catch (error) {
            console.error('Erro ao verificar saldo: ', error)
            throw error
        }
    }, [httpGET])

    const transfer = useCallback(async (value: number, accountId: number, transferKey: number) => {
        try {
            await httpPUT(`account/transfer/${accountId}`, {
                value: value,
                transferKey: transferKey
            }
            )
        } catch (error) {
            console.error('Erro ao transferir dinheiro: ', error)
            throw error
        }
    }, [httpPUT])

    const contextValue = useMemo(() => {
        return {
            account,
            searchAccountKey,
            deposit,
            createAccount,
            checkBalance,
            transfer,

        }
    }, [account, deposit, searchAccountKey, createAccount, checkBalance, transfer])

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    )
}