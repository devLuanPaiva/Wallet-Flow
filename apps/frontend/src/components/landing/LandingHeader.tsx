import Image from 'next/image';
import bankLogo from '../../../public/banners/8490233.png';
import Link from 'next/link';
export default function LandingHeader(){
    return(
        <header className="py-2 px-4 w-full flex justify-between bg-purple-50">
            <Image src={bankLogo} alt='Logo' height={42} width={48}/>
            <nav className='flex space-x-2 md:space-x-7 items-center'>
                <Link href={'#'} className='px-3 py-2 text-xs md:text-xl font-semibold rounded hover:bg-purple-400 hover:text-white'>Serviços</Link>
                <Link href={'#'} className='px-3 py-2 text-xs md:text-xl font-semibold rounded hover:bg-purple-400 hover:text-white'>Quem Somos</Link>
                <Link href={'auth'} className='px-3 py-2 text-xs md:text-xl font-semibold bg-purple-600 text-white rounded  hover:bg-purple-400'>Acessar</Link>
            </nav>
        </header>
    )
}