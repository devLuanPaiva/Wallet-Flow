'use client';
import useAccount from "@/data/hooks/useAccount";
import { useAccountData } from "@/data/hooks/useAccountData";
import { TransactionsI } from "@wallet/core";
import { useEffect, useState } from "react";
import LoadingComponent from "../shared/LoadingComponent";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import NotTransfer from "./NotTransfer";

export default function AccountExtract() {
    const { getAccountTransactions, reverse } = useAccount();
    const { account, loading } = useAccountData();
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsI[]>([]);
    const reverseTransactions = true;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        async function loadTransactions() {
            try {
                if (account?.id) {
                    const fetchedTransactions = await getAccountTransactions(account);
                    if (Array.isArray(fetchedTransactions)) {
                        setTransactions(fetchedTransactions);
                    } else {
                        setTransactions([]);
                    }
                }
            } catch (error) {
                setErrorMessage(`${error}`);
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
                setShowAlert(true);
                setErrorMessage(null);
            }
        } catch (error) {
            setErrorMessage(`${error}`);
            setShowAlert(true);
        }
    };

    if (loading || loadingTransactions) {
        return <LoadingComponent />
    }


    return account ? (
        <section className="w-full">
            <ul className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 py-4 shadow-lg min-w-[550px] min-h-[200px] transition-all duration-500 hover:shadow-2xl">
                <Alert
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    variant={errorMessage ? "destructive" : "default"}
                >
                    <AlertTitle>{errorMessage ? "Erro" : "Sucesso"}</AlertTitle>
                    <AlertDescription>{errorMessage ?? successMessage}</AlertDescription>
                </Alert>
                <h3 className="text-2xl relative z-20 md:text-3xl lg:text-5xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">Transações Bancárias</h3>
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
    ) : (
        <NotTransfer />
    )

}
