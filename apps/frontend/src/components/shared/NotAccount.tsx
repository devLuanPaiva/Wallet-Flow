import { IconPigOff } from "@tabler/icons-react";
import Link from "next/link";

export default function NotAccount() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-4 rounded-lg">
            <IconPigOff size={80} stroke={0.5} className="text-purple-950" />
            <h3>Você não possui conta.</h3>
            <Link href="/Account/create" className="bg-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-purple-700">
                Criar Conta
            </Link>
        </section>
    )
}