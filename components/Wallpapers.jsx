import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {assets} from '@/Assets/assets'

const Wallpapers = () => {
    const [wallpapers, setWallpapers] = useState([]);

    useEffect(() => {
        const fetchWallpapers = async () => {
            try {
                const response = await fetch('/api/wallpaper');
                const data = await response.json();
                setWallpapers(data.wallpapers);
            } catch (error) {
                console.error('Error fetching wallpapers:', error);
            }
        };

        fetchWallpapers();
    }, []);

    const handleDownload = async (wallpaper) => {
        try {
            // First increment the download counter
            await fetch('/api/wallpaper', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wallpaperId: wallpaper._id })
            });

            // Then trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = wallpaper.image;
            downloadLink.download = wallpaper.title + '.jpg';
            downloadLink.click();
        } catch (error) {
            console.error('Error downloading wallpaper:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ml-8 mr-8">
            {Array.isArray(wallpapers) && wallpapers.map((wallpaper) => (
                <div key={wallpaper._id} className="bg-gray-200 rounded-xl shadow-xl overflow-hidden border-2 border-gray-950">
                    <div className="bg-gray-200 aspect-video relative mt-8 mr-8 ml-8 rounded-xl">
                        <Image 
                            src={wallpaper.image} 
                            alt={wallpaper.title} 
                            fill
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <div className="p-4 ml-4">
                        <h2 className="text-xl font-bold">{wallpaper.title}</h2>
                        <p className="text-gray-600">
                            {wallpaper.description || 'Beautiful wallpaper for your device'}
                        </p>
                        <button 
                            className="mt-4 bg-gray-950 text-white font-semibold py-2 px-4 rounded-full hover:bg-slate-700 transition-colors"
                            onClick={() => handleDownload(wallpaper)}
                        >
                            Download
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Wallpapers