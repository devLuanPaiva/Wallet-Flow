'use client';
import useUser from "@/data/hooks/useUser";
import { IconEye, IconEyeOff, IconMail, IconPassword, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import logo from '../../../public/banners/8490233.png';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import TitleAnimated from "../shared/TitleAnimated";

export default function UserForm() {
    const [mode, setMode] = useState<'access' | 'register'>('access');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const { user, login, register } = useUser();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (user?.email) {
            router.push('/home');
        }
    }, [user, router, params]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (mode === 'access') {
            try {
                await login({ email, password });
            } catch (error) {
                setErrorMessage(`${error}`);
                setShowAlert(true);
            }
        } else {
            try {
                await register({ email, password, name });
                setSuccessMessage("Conta criada com sucesso!");
                setShowAlert(true);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage(`${error}`);
                setShowAlert(true);
            }
        }
        clearForm();
    }

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setMode('access');
    }

    const changeButton = () => {
        setToggleButton(!toggleButton);
    }

    return (
        <section className="flex flex-col justify-evenly h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-300 space-y-2">
            <Alert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                variant={errorMessage ? "destructive" : "default"}
            >
                <AlertTitle>{errorMessage ? "Erro" : "Sucesso"}</AlertTitle>
                <AlertDescription>{errorMessage ?? successMessage}</AlertDescription>
            </Alert>
            <header>
                {mode === 'access' ? <TitleAnimated titleTop="Acese" titleBottom="sua conta" slogan="Faça login e tenha o controle da sua carteira." /> : <TitleAnimated titleTop="Registre" titleBottom="sua conta" slogan="Junte-se a nós e comece a gerenciar suas finanças." />}
            </header>
            <article className="flex justify-center items-center gap-6 px-6 md:px-10">
                <form className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white p-4 shadow-lg w-full max-w-[400px] md:max-w-[550px] md:p-6 h-auto">
                    <figure className="mb-4">
                        <Image src={logo} alt="logo" width={150} height={120} />
                    </figure>
                    {mode === 'register' && (
                        <label className="w-full flex justify-center relative">
                            <IconUser size={20} className="absolute left-2 top-3 text-purple-500" />
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome"
                                className="bg-purple-100 text-gray-900 w-full px-4 py-2 rounded-md border border-purple-300 indent-3"
                            />
                        </label>
                    )}
                    <label className="w-full flex justify-center relative">
                        <IconMail size={20} className="absolute left-2 top-3 text-purple-500" />
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            className="bg-purple-100 text-gray-900 w-full px-4 py-2 rounded-md border border-purple-300 indent-3"
                        />
                    </label>
                    <label className="w-full flex justify-center relative">
                        <IconPassword size={20} className="absolute left-2 top-3 text-purple-500" />
                        <input
                            required
                            type={!toggleButton ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            className="bg-purple-100 text-gray-900 w-full px-4 py-2 rounded-md border border-purple-300 indent-3"
                        />
                        <button onClick={(e) => { e.preventDefault(); changeButton(); }} className="absolute top-2.5 right-3">
                            {!toggleButton ? <IconEye size={20} className="text-purple-500" /> : <IconEyeOff size={20} className="text-purple-500" />}
                        </button>
                    </label>
                    <div className="flex justify-end flex-col md:flex-row gap-3 w-full">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/');
                            }}
                            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 w-full md:w-auto"
                        >
                            Cancelar
                        </button>
                        <button onClick={handleSubmit} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 w-full md:w-auto">
                            {mode === 'access' ? 'Entrar' : 'Cadastrar'}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        {mode === 'access' ? (
                            <button
                                onClick={(e) => { e.preventDefault(); setMode('register'); }}
                                type="button"
                                className="text-purple-600 hover:text-purple-800"
                            >
                                Ainda não tem conta? Cadastre-se!
                            </button>
                        ) : (
                            <button
                                onClick={(e) => { e.preventDefault(); setMode('access'); }}
                                className="text-purple-600 hover:text-purple-800"
                            >
                                Já tem conta? Entre na plataforma!
                            </button>
                        )}
                    </div>
                </form>
            </article>
        </section>
    );
}
