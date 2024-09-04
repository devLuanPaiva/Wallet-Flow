import Image from 'next/image'
import Logo from '../../../public/banners/8490233.png'
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconBrandYoutube } from '@tabler/icons-react';

export default function Footer() {
    return (
        <footer className="flex items-center bg-black">
            <section className="container flex flex-col gap-7 py-10">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-5">
                    <Image src={Logo} alt="Logo" width={120} height={120} />
                    <article className="flex flex-col gap-1 items-center md:items-start">
                        <h2 className="text-2xl text-zinc-300 font-bold mb-2.5">
                            Sobre
                        </h2>
                        <p className="text-sm text-zinc-400">Nossa História</p>
                        <p className="text-sm text-zinc-400">
                            Política de Privacidade
                        </p>
                        <p className="text-sm text-zinc-400">Termos de Uso</p>
                    </article>
                    <article className="flex flex-col gap-1 items-center md:items-start">
                        <h2 className="text-2xl text-zinc-300 font-bold mb-2.5">
                            Contato
                        </h2>
                        <p className="text-sm text-zinc-400">
                            suporte@walletflow.com.br
                        </p>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <IconBrandWhatsapp size={20} className="text-green-500" />
                            <p>Whatsapp</p>
                        </div>
                    </article>
                </div>
                <section className="flex flex-col md:flex-row justify-between items-center gap-5">
                    <div className="flex gap-2 text-zinc-400">
                        <IconBrandYoutube size={28} stroke={1} />
                        <IconBrandInstagram size={28} stroke={1} />
                        <IconBrandFacebook size={28} stroke={1} />
                        <IconBrandLinkedin size={28} stroke={1} />
                    </div>
                    <article className="flex flex-col md:flex-row items-center gap-1.5 text-zinc-400 text-sm">
                        <div className="flex gap-1.5">
                            <p>Feito com</p>
                            <i>❤️</i>
                            <p>em {new Date().getFullYear()}</p>
                        </div>
                        <span className="hidden md:inline-block">-</span>
                        <p>Todos os direitos reservados</p>
                    </article>
                </section>
            </section>
        </footer>
    );
}
