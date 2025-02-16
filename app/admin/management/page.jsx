'use client'
import DataTable from '@/components/dataTable'
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Page = () => {
  const [blogs,setBlogs] = useState([]);
  const fetchBlogs = async()=>{
    const response = await axios.get(`/api/wallpaper`);
    setBlogs(response.data.wallpapers);
  }

  const deleteBlog = async (mongoId) => {
    try {
        const response = await axios.delete(`/api/wallpaper`, {
            params: {
                id: mongoId // Ensure the ID is being sent correctly
            }
        });
        toast.success(response.data.msg);
        fetchBlogs(); // Refresh the list after deletion
    } catch (error) {
        toast.error("Error deleting wallpaper: " + error.message);
    }
  }

  useEffect(()=>{
    fetchBlogs();
  },[]);
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 rounded bg-slate-200' >
      <h1 className='text-xl font-semibold'>All Wallpapers</h1>
      <div className='realtive h-[80vh] max-w[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full test-sm text-gray-500'>
          <thead className='text-sm text-white uppercase text-left bg-gray-950'>
            <tr>
              <th scope='col' className=' px-6 py-3'>
                Wallpaper Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>

            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => (
              <DataTable 
                key={item._id} 
                mongoId={item._id} 
                title={item.title} 
                date={item.createdAt}
                deleteBlog={deleteBlog}
              />
            ))} 
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Page