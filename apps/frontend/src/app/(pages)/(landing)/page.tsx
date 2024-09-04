import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";

export default function Page() {
    return (
        <BackgroundBeamsWithCollision className="flex items-center justify-center">
            <main className="text-center">
                <h1 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">Bem-vindo ao <span className="bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">Wallet Flow!</span></h1>
                <p className="text-lg mb-8">Sua jornada financeira começa aqui. Acesse a página de autenticação para continuar.</p>
                <Link href="/auth"className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300">Acessar
                </Link>
            </main>
        </BackgroundBeamsWithCollision>
    );
}
