import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {assets} from '@/Assets/assets'

const Header = () =>{
    return(
        <div>
            <div className="flex justify-between py-4 px-8 items-center ml-10 mr-10 mt-2 bg-gray-950 border-2 border-gray-950 rounded-xl">
                <div>
                    <Image className='bg-white p-2 rounded-xl' src={assets.logo} width={150} alt='logo'></Image>
                </div>

                <div className='flex gap-4 text-white'>
                    <p className='text-lg font-semibold '>Home</p>
                    <Link href='/admin'>
                    <p className='text-lg font-semibold '>Admin</p>
                    </Link>
                    <p className='text-lg font-semibold '>Generative AI</p>
                </div>
            </div>

            <div className='m-10 bg-gray-950 justify-center p-10 rounded-xl'>
              <h1 className='m-4 font-semibold text-5xl text-center text-white'>Explore Our Fresh Collections <br /> of Wallpapers</h1>
              <p className="m-4 text-center font-medium text-xl text-white">Get all the Wallpapers for all the devices you own</p>
            </div>
        </div>
    )
}
export default Header