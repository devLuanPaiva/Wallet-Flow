'use client'
import { HoverEffect } from "../ui/card-hover-effect"; 

export default function LandingQuality() {
    const qualities = [
        {
            title: "Simplicidade",
            description: "Uma interface intuitiva e fácil de usar, permitindo que você navegue sem complicações e realize suas transações de forma prática e rápida.",
            link: ""
        },
        {
            title: "Rapidez",
            description: "Realize todas as suas operações em poucos segundos. Nosso sistema é otimizado para oferecer a melhor agilidade possível em suas transações.",
            link: ""
        },
        {
            title: "Segurança",
            description: "Com tecnologias de ponta, garantimos a máxima proteção dos seus dados e transações, oferecendo segurança em cada clique.",
            link: ""
        },
    ];

    return (
        <section className="relative w-full min-h-[600px] flex justify-around flex-wrap items-center px-10 pt-5 box-border">
            <HoverEffect items={qualities} />
        </section>
    );
}
