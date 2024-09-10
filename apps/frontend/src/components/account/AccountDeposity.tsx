'use client';
import React, { useState } from "react";
import useAccount from "@/data/hooks/useAccount";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { AccountProps } from "@/data/interfaces";
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

export default function AccountDeposity({ account }: Readonly<AccountProps>) {
    const { deposit } = useAccount();
    const [valueDeposity, setValueDeposity] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleDeposit = async () => {
        if (!valueDeposity) {
            setErrorMessage("Deve existir algum valor para ser depositado!");
            setShowAlert(true);
            return;
        }

        try {
            await deposit(valueDeposity, account.id!);
            setSuccessMessage("Depósito realizado com sucesso!");
            setIsAlertDialogOpen(false);
            setShowAlert(true);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(`${error}`);
            setShowAlert(true);
        }
    };


    return (
        <section className="mt-5">
            <form className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white px-6 shadow-lg w-[550px] h-[200px]">
                <h2 className="text-2xl relative z-20 md:text-3xl lg:text-5xl font-bold text-center text-purple-950 dark:text-purple-900 font-sans tracking-tight">Realizar Depósito</h2>
                <label className="w-[100%] flex justify-center relative">
                    <IconCurrencyDollar size={20} className="absolute left-2 top-3 text-purple-500" />
                    <input
                        type="number"
                        placeholder="Valor"
                        value={valueDeposity ?? ""}
                        onChange={e => setValueDeposity(Number(e.target.value) > 0 ? Number(e.target.value) : null)}
                        className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                    />
                </label>

                <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <button
                            type="button"

                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 hover:from-purple-600 hover:to-purple-700 rounded"
                        >
                            Depositar
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar Depósito</AlertDialogTitle>
                            <AlertDialogDescription>Tem certeza de que deseja finalizar o depósito?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="button rounded">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeposit}
                                className="button rounded bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-base md:text-lg py-2 px-4 hover:from-green-600 hover:to-green-700"
                            >
                                Confirmar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Alert
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    variant={errorMessage ? "destructive" : "default"}
                >
                    <AlertTitle>{errorMessage ? "Erro" : "Sucesso"}</AlertTitle>
                    <AlertDescription>{errorMessage ?? successMessage}</AlertDescription>
                </Alert>
            </form>
        </section>
    );
}
