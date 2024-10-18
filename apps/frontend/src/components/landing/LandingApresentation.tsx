'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import bankInPhone from '../../../public/banners/iphone16.png';

const poppins = Poppins({
    weight: ['600', '400'],
    subsets: ['latin'],
});

export default function LandingApresentation() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative w-full flex flex-col items-center min-h-[600px] px-10 pt-5 bg-gradient-to-b from-purple-50 via-purple-100 to-purple-300 space-y-2 overflow-hidden shadow-xl">
            <h1
                className={`text-5xl sm:text-6xl md:text-7xl text-center font-black ${poppins.className} transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
            >
                <span className="text-purple-800">Revolucione</span> <br />
                <span className="text-zinc-600">Sua Carteira</span>
            </h1>
            <p
                className={`text-lg sm:text-xl md:text-2xl text-center text-zinc-500 font-normal ${poppins.className} transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}
            >
                Simples, Segura e Confiável
            </p>

            <div className="absolute top-1/2 w-full flex justify-center">
                <div className={`w-[80%] sm:w-[60%] md:w-[45%] lg:w-[25%] transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
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
