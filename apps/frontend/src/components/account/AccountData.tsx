'use client'
import { IconPigOff } from '@tabler/icons-react';
import Link from 'next/link';
import { useAccountData } from '@/data/hooks/useAccountData';

export default function AccountData() {
    const { account, loading } = useAccountData()
    if (loading) {
        return <p>Carregando...</p>;
    }
    return (
        <>
            {
                account ? (
                    <section className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 shadow-lg w-[550px] h-[200px]">
                        <h2 className="text-2xl relative z-20 md:text-3xl lg:text-5xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">
                            Dados de Conta
                        </h2>
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
