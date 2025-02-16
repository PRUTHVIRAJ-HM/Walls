import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {assets} from '@/Assets/assets'

const Header = () =>{
    return(
        <div className="flex justify-between p-4 items-center ml-10 mr-10 mt-2 border-b-4 border-orange-400">
            <div>
                <Image src={assets.logo} width={150} alt='logo'></Image>
            </div>

            <div className='flex gap-4'>
                <p className='text-lg font-semibold text-slate-700'>Home</p>
                <Link href='/admin'>
                <p className='text-lg font-semibold text-slate-700'>Admin</p>
                </Link>
                <p className='text-lg font-semibold text-slate-700'>Generative AI</p>
            </div>
            
        </div>
    )
}
export default Header