'use client'
import useAccount from "@/data/hooks/useAccount"
import { AccountI } from "@wallet/core"
import { useState } from "react"

export default function AccountForm() {
    const [transferKey, setTransferKey] = useState<bigint | undefined>()
    const [initialBalance, setInitialBalance] = useState<number | undefined>()
    const { createAccount } = useAccount()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newAccount: Partial<AccountI> = {
            transferKey: transferKey,
            bankBalance: initialBalance,
        }

        try {
            await createAccount(newAccount)
            setTransferKey(undefined)
            setInitialBalance(undefined)
        } catch (error) {
            console.error('Erro ao criar conta: ', error)
        }
    }

    return (
        <section className="mt-5">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 shadow-lg w-[550px] h-[300px]">
                <h1 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">Criar Conta</h1>
                <label className="w-[100%] flex justify-center relative">
                    <input
                        type="number"
                        placeholder="Chave de Transferência"
                        value={transferKey?.toString() ?? ''}
                        onChange={e => setTransferKey(e.target.value ? BigInt(e.target.value) : undefined)}
                        className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                    />

                </label>
                <label className="w-[100%] flex justify-center relative">
                    <input
                        type="number"
                        placeholder="Saldo Inicial"
                        value={initialBalance ?? ''}
                        onChange={e => setInitialBalance(Number(e.target.value) || undefined)}
                        className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                    />
                </label>
                <button type="submit" className="bg-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-purple-700 ">Criar Conta</button>
            </form>
        </section>
    )
}
