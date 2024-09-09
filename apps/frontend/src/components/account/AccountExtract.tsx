'use client';
import useAccount from "@/data/hooks/useAccount";
import { useAccountData } from "@/data/hooks/useAccountData";
import { TransactionsI } from "@wallet/core";
import { useEffect, useState } from "react";
import LoadingComponent from "../shared/LoadingComponent";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export default function AccountExtract() {
    const { getAccountTransactions, reverse } = useAccount();
    const { account, loading } = useAccountData();
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsI[]>([]);
    const reverseTransactions = true;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        async function loadTransactions() {
            try {
                if (account?.id) {
                    const fetchedTransactions = await getAccountTransactions(account.id);
                    if (Array.isArray(fetchedTransactions)) {
                        setTransactions(fetchedTransactions);
                    } else {
                        console.error('Transações recebidas não são um array: ', fetchedTransactions);
                        setTransactions([]);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar as transações: ', error);
                setTransactions([]);
            } finally {
                setLoadingTransactions(false);
            }
        }
        loadTransactions();
    }, [getAccountTransactions, account]);

    const handleReverseTransaction = async (transactionId: number) => {
        try {
            if (transactionId !== undefined) {
                await reverse(transactionId, reverseTransactions);
                setTransactions((prevTransactions) =>
                    prevTransactions.map((transaction) =>
                        transaction.id === transactionId
                            ? { ...transaction, reversed: !transaction.reversed }
                            : transaction
                    )
                );
                setSuccessMessage("Transação revertida com sucesso!");
                setIsAlertDialogOpen(false);
                setShowAlert(true);
                setErrorMessage(null);
            }
        } catch (error) {
            console.error('Erro ao reverter transação: ', error);
            setErrorMessage("Erro ao reverter transação.");
            setShowAlert(true);
        }
    };

    if (loading || loadingTransactions) {
        return <LoadingComponent />
    }


    return (
        <section className="mt-5">
            <ul className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 py-4 shadow-lg min-w-[550px] min-h-[200px]">
                <Alert
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    variant={errorMessage ? "destructive" : "default"}
                >
                    <AlertTitle>{errorMessage ? "Erro" : "Sucesso"}</AlertTitle>
                    <AlertDescription>{errorMessage ?? successMessage}</AlertDescription>
                </Alert>
                <h2 className="text-2xl relative z-20 md:text-3xl lg:text-5xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">Transações Bancárias</h2>
                <div className="w-full flex flex-col gap-5">
                    {transactions.map((transaction) => (
                        <li
                            key={transaction.id}
                            className="flex justify-between items-center bg-white border border-gray-300 p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <span className='text-gray-700 font-medium'>{transaction.type === 'DEPOSIT' ? 'Depósito' : 'Transferência'}</span>
                            <span
                                className={`font-bold ${transaction.type === 'TRANSFER' ? 'text-red-700' : 'text-green-500'}`}
                            >
                                {transaction.value!.toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                            <button

                                onClick={() => handleReverseTransaction(transaction.id!)}
                                disabled={transaction.reversed}
                                className={`text-blue-500 hover:underline ${transaction.reversed ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                Reverter
                            </button>

                        </li>

                    ))}
                </div>
            </ul>
        </section>
    );

}
