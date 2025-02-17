import React from 'react'
import Image from 'next/image'
import {assets} from '@/Assets/assets'

const Footer = () =>{
    return(
        <div className='ml-10 mr-10 bg-gray-950 rounded-t-xl'>
            <div className='flex justify-between ml-10 mr-10 pt-10 pb-4'>
                <div>
                    <Image className='p-2 bg-white rounded'  src={assets.logo} width={200} alt=''/>
                </div>
                <div className="flex gap-8 text-white">
                    <div className='flex flex-col gap-4 font-semibold'>
                        <p>Home</p>
                        <p>About</p>
                        <p>Sources</p>
                        <p>Features</p>
                    </div>
                    <div className='flex flex-col gap-4 font-semibold'>
                        <p>Home</p>
                        <p>About</p>
                        <p>Sources</p>
                        <p>Features</p>
                    </div>
                    <div className='flex flex-col gap-4 font-semibold'>
                        <p>Home</p>
                        <p>About</p>
                        <p>Sources</p>
                        <p>Features</p>
                    </div>
                </div>
            </div>
            <div>
                <p className='p-2 mb-4 font-semibold text-xl text-center bg-gray-950 text-gray-200 border-t-2 rounded-b-xl'>Built & Designed by Pruthviraj HM</p>
            </div>
        </div>
    )
}

export default Footer