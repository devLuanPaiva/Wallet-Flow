'use client';
import useUser from "@/data/hooks/useUser";
import { IconEye, IconEyeOff, IconMail, IconPassword, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import imgBunner from '../../../public/banners/4234239.jpg'
import logo from '../../../public/banners/8490233.png'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserForm() {
    const [mode, setMode] = useState<'access' | 'register'>('access');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const { user, login, register } = useUser();

    useEffect(() => {
        if (user?.email) {
            router.push('/home');
        }
    }, [user, router, params]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (mode === 'access') {
            await login({ email, password });
        } else {
            await register({ email, password, name });
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
        <section className="flex justify-center items-center h-screen relative bg-purple-200">
            <Image src={imgBunner} fill alt="cartões empilhados" className="object-right-bottom" />
            <section className="flex justify-center items-center gap-10 absolute top-0 left-0 w-full h-full px-10 ">
                <form className="flex flex-col justify-center items-center gap-4 rounded-lg bg-white p-6 shadow-lg w-[550px] h-[500px] ml-[25%]">
                    <figure>
                        <Image src={logo} alt="logo" width={150} height={120}/>
                    </figure>
                    {mode === 'register' && (
                        <label className="w-[100%] flex justify-center relative">
                            <IconUser size={20} className="absolute left-2 top-3 text-purple-500" />
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome"
                                className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                            />
                        </label>
                    )}
                    <label className="w-[100%] flex justify-center relative">
                        <IconMail size={20} className="absolute left-2 top-3 text-purple-500" />
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                        />
                    </label>
                    <label className="w-[100%] flex justify-center relative">
                        <IconPassword size={20} className="absolute left-2 top-3 text-purple-500" />
                        <input
                            required
                            type={!toggleButton ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            className="bg-purple-100 text-gray-900 w-[100%] px-4 py-2 rounded-md border border-purple-300 indent-3"
                        />
                        <button onClick={(e) => { e.preventDefault(); changeButton() }} className="absolute top-2.5 right-3">
                            {!toggleButton ? <IconEye size={20} className="text-purple-500" /> : <IconEyeOff size={20} className="text-purple-500" />}
                        </button>
                    </label>
                    <div className="flex gap-5 w-[100%]">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/')
                            }}
                            className="bg-gray-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-gray-700 flex-1"
                        >
                            Cancelar
                        </button>
                        <button onClick={handleSubmit} className="bg-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-purple-700 flex-1">
                            {mode === 'access' ? 'Entrar' : 'Cadastrar'}
                        </button>
                    </div>
                    <div className="flex gap-5 justify-center">
                        {mode === 'access' ? (
                            <button
                                onClick={(e) => { e.preventDefault(); setMode('register') }}
                                type="button"
                                className="text-purple-600 hover:text-purple-800"
                            >
                                Ainda não tem conta? Cadastre-se!
                            </button>
                        ) : (
                            <button
                                onClick={(e) => { e.preventDefault(); setMode('access') }}
                                className="text-purple-600 hover:text-purple-800"
                            >
                                Já tem conta? Entre na plataforma!
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </section>
    )
}
