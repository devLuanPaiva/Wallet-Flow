'use client'
import { useEffect, useState } from "react";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['600', '400'],
    subsets: ['latin'],
});

interface TitleProps {
    titleTop: string
    titleBottom: string
    slogan: string
}
export default function TitleAnimated({ titleTop, titleBottom, slogan }: Readonly<TitleProps>) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <h1
                className={`text-5xl sm:text-6xl md:text-7xl text-center font-black ${poppins.className} transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
            >
                <span className="text-purple-800">{titleTop}</span> <br />
                <span className="text-zinc-600">{titleBottom}</span>
            </h1>
            <p
                className={`text-lg sm:text-xl md:text-2xl text-center text-zinc-500 font-normal ${poppins.className} transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}
            >
                {slogan}
            </p>
        </>
    )
}