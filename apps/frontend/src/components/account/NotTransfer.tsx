import { IconInbox } from '@tabler/icons-react';

export default function NotTransfer() {
    return (
        <section className="h-screen flex flex-col justify-center items-center gap-4 rounded-lg">
            <IconInbox size={80} stroke={0.5} className="text-purple-950" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Nenhuma transferência disponível
            </h3>
            <p className="mt-2 text-gray-500 text-center">
                Não há transferências registradas no momento. Realize uma transferência para visualizar os detalhes aqui.
            </p>
        </section>
    );
}
