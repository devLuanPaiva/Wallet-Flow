import Image from 'next/image';
import { Poppins } from 'next/font/google';
import bankInPhone from '../../../public/banners/iphone16.png';

const poppins = Poppins({
    weight: ['600', '400'],
    subsets: ['latin'],
});

export default function LandingApresentation() {
    return (
        <section className="relative w-full flex flex-col items-center min-h-[600px] px-10 pt-5 bg-gradient-to-b from-purple-50 via-purple-100 to-purple-300 space-y-2 overflow-hidden shadow-xl">
            <h1
                className={`text-5xl sm:text-6xl md:text-7xl text-center font-black ${poppins.className}`}
            >
                <span className="text-purple-800">Revolucione</span> <br />
                <span className="text-zinc-600">Sua Carteira</span>
            </h1>
            <p
                className={`text-lg sm:text-xl md:text-2xl text-center text-zinc-500 font-normal ${poppins.className}`}
            >
                Simples, Segura e Confiável
            </p>

            <div className="absolute top-1/2 w-full flex justify-center">
                <div className="w-[80%] sm:w-[60%] md:w-[45%] lg:w-[25%]">
                    <Image
                        src={bankInPhone}
                        alt="Imagem de um iPhone"
                        className="object-contain"
                        layout="responsive"
                    />
                </div>
            </div>
        </section>
    );
}
