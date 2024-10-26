import Image from 'next/image';
import AppInPhone from '../../../public/banners/mockrocket-capture.png';
import Card from '../../../public/banners/card.png';
import CreateAccount from '../../../public/banners/mulher.png';
import { WobbleCard } from '../ui/wobble-card';

export default function LandingAdvertising() {
    return (
        <section className="w-full min-h-screen px-10 py-16 bg-purple-200 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">

                <WobbleCard className="bg-purple-700 hover:bg-purple-600 transition-transform transform hover:-translate-y-2 hover:scale-105 rounded-lg shadow-lg">
                    <article className="flex items-center p-6 space-y-4 flex-col">
                        <Image src={AppInPhone} alt="App no celular" height={250} width={250} className="rounded-lg shadow-xl" />
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Baixe o nosso App</h2>
                            <p className=" mb-4 text-xl">
                                Tenha controle total sobre suas finanças. Pague contas, transfira e acompanhe seus investimentos.
                            </p>
                            <button className="py-2 px-6 bg-white text-purple-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                Baixar agora
                            </button>
                        </div>
                    </article>
                </WobbleCard>

                <WobbleCard className="bg-purple-400 hover:bg-purple-300 transition-transform transform hover:-translate-y-2 hover:scale-105 rounded-lg shadow-lg">
                    <article className="flex items-center p-6 space-y-4 flex-col">
                        <Image src={Card} alt="Cartão do banco" height={250} width={250} className="rounded-lg shadow-xl" />
                        <div>
                            <h3 className="text-3xl font-bold mb-2">Peça seu Cartão</h3>
                            <p className="text-xl mb-4">
                                Aproveite vantagens como zero anuidade e cashback em suas compras.
                            </p>
                            <button className="py-2 px-6 bg-white text-purple-400 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                Solicitar agora
                            </button>
                        </div>
                    </article>
            </WobbleCard>

                <div className="md:col-span-2 md:flex md:justify-center">
                    <WobbleCard className="bg-purple-500 hover:bg-purple-400 transition-transform transform hover:-translate-y-2 hover:scale-105 rounded-lg shadow-lg w-full">
                        <article className="flex items-center p-6 space-x-6 flex-col md:flex-row">
                            <Image src={CreateAccount} alt="Mulher criando conta" className="w-48 h-auto rounded-lg shadow-xl" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Abra sua Conta</h3>
                                <p className="text-base mb-4">
                                    Sem burocracia e com benefícios exclusivos para você.
                                </p>
                                <button className="py-2 px-6 bg-white text-purple-500 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                    Criar conta
                                </button>
                            </div>
                        </article>
                    </WobbleCard>
                </div>
            </div>
        </section>
    );
}
