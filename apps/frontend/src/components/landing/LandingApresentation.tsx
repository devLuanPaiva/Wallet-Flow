'use client'
import Image from 'next/image';
import bankInPhone from '../../../public/banners/iphone16.png';
import TitleAnimated from '../shared/TitleAnimated';
import { useEffect, useState } from 'react';

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
            <TitleAnimated titleTop='Revolucione' titleBottom='sua carteira' slogan='Simples, Rapida e Segura'/>

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
