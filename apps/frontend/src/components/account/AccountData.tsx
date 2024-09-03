'use client'
import React, { useEffect, useState } from 'react';
import useAccount from "@/data/hooks/useAccount";
import { AccountI } from "@wallet/core";
import { IconPigOff } from '@tabler/icons-react';
import Link from 'next/link';

export default function AccountData() {
    const { fetchAccount } = useAccount();
    const [account, setAccount] = useState<AccountI | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadAccount() {
            try {
                const fetchedAccount = await fetchAccount();
                setAccount(fetchedAccount);
            } catch (error) {
                console.error('Erro ao carregar a conta: ', error);
            } finally {
                setLoading(false);
            }
        }

        loadAccount();
    }, [fetchAccount]);

    if (loading) {
        return <p>Carregando...</p>;
    }
    return (
        <>
            {
                account ? (
                    <section className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 shadow-lg w-[550px] h-[300px]">
                        <h1 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">
                            Dados de Conta
                        </h1>
                        <div className='w-full flex flex-col justify-start align-top'>
                            <p className='text-purple-950'>Usuário da Conta: {account.user.name}</p>
                            <p className='text-purple-950'>Email do usuário: {account.user.email}</p>
                            <p className='text-purple-950'>Saldo: {account.bankBalance.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                            })}</p>
                            <p className='text-purple-950'>Chave de Transferência: {account.transferKey}</p>
                        </div>

                    </section >
                ) : (
                    <section className='flex flex-col justify-center items-center gap-4 rounded-lg'>
                        <IconPigOff stroke={50} />
                        <h3>Você não possui conta.</h3>
                        <Link href='/Account/create' className="bg-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-purple-700">Criar Conta</Link>
                    </section>
                )
            }
        </>
    );
}
