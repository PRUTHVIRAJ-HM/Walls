import React from 'react'
import Image from 'next/image'
import { assets } from "@/Assets/assets";

const DataTable = ({ title, date, deleteBlog, mongoId }) => {
  const wallpaperDate = new Date(date);
  
  return (
    <tr className='bg-slate-800 border-b text-left'>
      <td className='px-6 py-4 text-white'>
        {title || "No Title"}
      </td>
      <td className='px-6 py-4 text-white'>
        {wallpaperDate.toDateString()}
      </td>
      <td onClick={() => deleteBlog(mongoId)} className='px-6 py-4 font-xl text-red-600 font-bold cursor-pointer'>
        <Image 
          width={20} 
          height={20} 
          alt='delete icon' 
          src={assets.deletes} 
          className='hover:scale-125 transition-all duration-200'
        />
      </td>
    </tr>
  )
}

export default DataTable