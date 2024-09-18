import Link from 'next/link';
import React from 'react';
import logo from '../../../public/banners/8483839.png'
import Image from 'next/image';
import TopMenu from './TopMenu';

const Header = () => {
  return (
    <header className="bg-white w-full px-4 flex items-center justify-between shadow-md z-10">
      <figure>
        <Image src={logo} alt="logo" height={80} width={80} />
      </figure>

      <nav className="flex-1 flex justify-center items-center">
        <Link href="/home" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Home</Link>
        <Link href="/Account" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Conta</Link>
        <Link href="/Account/extract" className="text-black rounded-md px-4 py-2 hover:bg-purple-500 hover:text-white ">Extrato</Link>
      </nav>

      <div className='bg-purple-600 clip-triangle w-[30%] h-[80px] flex justify-end items-center p-3 -mr-4'>
        <TopMenu/>
      </div>
    </header>
  );
};

export default Header;
