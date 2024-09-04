'use client'
import useAccount from "@/data/hooks/useAccount";
import { useAccountData } from "@/data/hooks/useAccountData";
import { IconCurrencyDollar, IconKey } from "@tabler/icons-react";
import { useState } from "react";

export default function AccountTransfer() {
    const { transfer } = useAccount();
    const [valueDeposity, setValueDeposity] = useState<number>();
    const [transferKey, setTransferKey] = useState<bigint>();
    const { account, loading } = useAccountData();

    const handleDeposit = async (e: any) => {
        e.preventDefault()
        try {
            await transfer(valueDeposity!, account!.id!, transferKey!);
            alert("Transferencia realizada com sucesso!");
        } catch (error) {
            alert("Erro ao realizar depósito.");
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }
    return (
        <section className="mt-5">
            <form onSubmit={handleDeposit} className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 shadow-lg w-[550px] h-[300px]">
                <h2 className="text-2xl relative z-20 md:text-3xl lg:text-5xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">Realizar Transferência</h2>
                <label className="w-[100%] flex justify-center relative">
                    <IconCurrencyDollar size={20} className="absolute left-2 top-3 text-purple-500" />
                    <input
                        type="number"
                        placeholder="Valor"
                        value={valueDeposity}
                        onChange={e => setValueDeposity(Number(e.target.value))}
                        className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                    />
                </label>
                <label className="w-[100%] flex justify-center relative">
                    <IconKey size={20} className="absolute left-2 top-3 text-purple-500" />
                    <input
                        type="number"
                        placeholder="Chave de Transferência"
                        value={transferKey?.toString() ?? ''}
                        onChange={e => setTransferKey(e.target.value ? BigInt(e.target.value) : undefined)}
                        className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                    />
                </label>
                <button type="submit" className="bg-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-purple-700 ">Depositar</button>
            </form>
        </section>
    );
}