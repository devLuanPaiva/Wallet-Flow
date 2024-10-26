'use client'
import { useState } from 'react';
import { AccountProps } from "@/data/interfaces";
import AccountDeposity from "./AccountDeposity";
import AccountExtract from "./AccountExtract";
import AccountTransfer from "./AccountTransfer";
import { IconCash, IconTransferIn, IconFileText } from '@tabler/icons-react';

export default function AccountSteps({ account }: Readonly<AccountProps>) {
    const [selectedOperation, setSelectedOperation] = useState<string | null>('extract');

    const renderOperation = () => {
        switch (selectedOperation) {
            case 'extract':
                return <AccountExtract />;
            case 'deposit':
                return <AccountDeposity account={account} />;
            case 'transfer':
                return <AccountTransfer account={account} />;
            default:
                return <p>Selecione uma operação.</p>;
        }
    };

    return (
        <section className="min-h-full flex flex-col items-center space-y-6 w-full">
            <h2 className="text-3xl font-bold text-purple-900">Operações</h2>
            <section className="flex justify-center gap-6">
                <button 
                    className="group p-6 rounded-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-purple-200 to-purple-300 cursor-pointer"
                    onClick={() => setSelectedOperation('extract')}
                >
                    <IconFileText size={36} className="text-purple-800 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-semibold mt-2">Extrato</h3>
                </button>
                <button 
                    className="group p-6 rounded-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-purple-200 to-purple-300 cursor-pointer"
                    onClick={() => setSelectedOperation('deposit')}
                >
                    <IconCash size={36} className="text-purple-800 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-semibold mt-2">Depósito</h3>
                </button>
                <button 
                    className="group p-6 rounded-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-purple-200 to-purple-300 cursor-pointer"
                    onClick={() => setSelectedOperation('transfer')}
                >
                    <IconTransferIn size={36} className="text-purple-800 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-semibold mt-2">Transferência</h3>
                </button>
            </section>

            <section className="mt-6 w-full">
                {renderOperation()}
            </section>
        </section>
    );
}
