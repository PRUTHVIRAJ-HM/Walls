'use client'
import React , {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import Image from 'next/image'
import {assets} from '@/Assets/assets'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const page=()=>{
    const[image,setImage]= useState(false);
    const[data,setData]= useState({
        title:""
    })

    const onChangeHandler=(event)=>{
        const name= event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
        console.log(data);
    }
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('image',image);
        const response = await axios.post('/api/wallpaper',formData);
        if(response.data.success){
            toast.success(response.data.msg)
        }
        else{
            toast.error("Upload Failed ⚠")
        }
    }

    return(
        <>
        <form onSubmit={onSubmitHandler}>
            <h1 className="mt-4 text-center font-semibold text-3xl">Upload Panel</h1>
            <div className='bg-gray-300 px-4 py-8 mt-4 rounded'>
                <div className='bg-gray-950 p-4 border-4 mt-4 ml-8 mr-8 rounded-xl'>
                    <h1 className='font-semibold text-2xl text-white'>Upload the Wallpaper</h1>
                    <label htmlFor="image">
                        <Image className='mt-4 cursor-pointer' src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt=' '></Image>
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
                    <p className='font-semibold text-2xl mt-4 text-white'>Enter the Wallpaper Title</p>
                    <input name='title' onChange={onChangeHandler} value={data.title} className='p-2 border-2 border-black mt-4' type="text" placeholder='Enter here' required />
                    <br />
                    <button type='submit' className='py-3 px-8 mt-4 rounded transition-colors bg-gray-700 hover:bg-slate-500 text-center text-white'>Upload</button>
                </div>
            </div>
        </form>
        <ToastContainer theme='dark' position="top-right" autoClose={3000} />
        </>
    )
}
export default page