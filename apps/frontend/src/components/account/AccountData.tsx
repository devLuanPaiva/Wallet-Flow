'use client'
import { AccountProps } from '@/data/interfaces';

export default function AccountData({ account }: Readonly<AccountProps>) {

    return (
        <article className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 shadow-lg w-[550px] h-[200px]">
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

        </article >

    );
}
