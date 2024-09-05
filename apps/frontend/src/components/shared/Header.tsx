import Link from 'next/link';
import React from 'react';
import logo from '../../../public/banners/8483839.png'
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white px-4 flex items-center justify-between shadow-md z-10">
      <figure>
        <Image src={logo} alt="logo" height={80} width={80} />
      </figure>

      <nav className="space-x-4">
        <Link href="/home" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Home</Link>
        <Link href="/Account" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Conta</Link>
        <Link href="/Account/extract" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Extrato</Link>
        <Link href="#" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Promoções</Link>
      </nav>

      <div className='bg-purple-600 clip-triangle w-[30%] h-[80px] flex justify-end items-center p-3 -mr-4'>
        <Link href='/Account/create' className="z-10 bg-white text-black rounded-md px-4 py-2 hover:bg-gray-50">
          <span className="relative z-10">Criar Conta</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
