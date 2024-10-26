'use client';
import { AccountProps } from '@/data/interfaces';
import { FormatPixKey } from '@wallet/ui';
import { useEffect, useState } from 'react';
import { IconPigMoney, IconKey } from '@tabler/icons-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['600', '400'],
    subsets: ['latin'],
});

export default function AccountData({ account }: Readonly<AccountProps>) {
    const formattedPixKey = FormatPixKey.format(account.transferKey.toString());

    return (
        <article className={`w-full bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105`}>
            <div className="flex items-center justify-between">
                <h1 className={`text-2xl text-white font-bold ${poppins.className}`}>
                    Bem-vindo, {account.user.name}!
                </h1>
                <IconPigMoney className="text-yellow-400 w-8 h-8" />
            </div>
            
            <div className="mt-4">
                <p className="text-lg text-gray-400">Saldo atual:</p>
                <p className="text-4xl font-semibold text-green-400 mt-1 animate-pulse">
                    {account.bankBalance.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>

            <div className="mt-6 flex items-center space-x-2">
                <IconKey className="text-gray-300 w-6 h-6" />
                <p className="text-gray-300 text-sm">
                    Chave de Transferência:
                </p>
            </div>
            <p className="text-gray-100 font-mono bg-gray-700 p-2 rounded-lg mt-2">
                {formattedPixKey}
            </p>
        </article>
    );
}
