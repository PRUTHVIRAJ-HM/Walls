'use client'
import Sidebar from "@/components/Sidebar"
import Image from 'next/image'
import {assets} from "@/Assets/assets"
import { usePathname } from "next/navigation"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from "react"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Layout({children}){
    const pathname = usePathname()
    const [wallpaperCount, setWallpaperCount] = useState('Loading...')
    const [storageUsed, setStorageUsed] = useState('Loading...')
    const [storageValue, setStorageValue] = useState(0)
    const [totalDownloads, setTotalDownloads] = useState('Loading...')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countResponse, storageResponse, downloadsResponse] = await Promise.all([
                    fetch('/api/wallpaper?count=true'),
                    fetch('/api/wallpaper?storage=true'),
                    fetch('/api/wallpaper?downloads=true')
                ]);
                
                const [countData, storageData, downloadsData] = await Promise.all([
                    countResponse.json(),
                    storageResponse.json(),
                    downloadsResponse.json()
                ]);
                
                setWallpaperCount(countData.count);
                setStorageUsed(storageData.storage);
                setTotalDownloads(downloadsData.downloads);
                
                // Convert storage to MB for chart
                const storageNum = parseFloat(storageData.storage.split(' ')[0]);
                const unit = storageData.storage.split(' ')[1];
                setStorageValue(unit === 'KB' ? storageNum / 1024 : storageNum);
            } catch (error) {
                console.error('Error fetching data:', error);
                setWallpaperCount('Error');
                setStorageUsed('Error');
                setTotalDownloads('Error');
                setStorageValue(0);
            }
        }

        fetchData();
    }, [])

    const chartData = {
        labels: ['Used', 'Available'],
        datasets: [{
            data: [storageValue, 512 - storageValue],
            backgroundColor: [
                'rgba(34, 197, 94, 0.2)',  // green-500 with opacity
                'rgba(75, 85, 99, 0.2)',   // gray-600 with opacity
            ],
            borderColor: [
                'rgb(34, 197, 94)',        // green-500
                'rgb(75, 85, 99)',         // gray-600
            ],
            borderWidth: 1,
            cutout: '70%'
        }]
    }

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw.toFixed(2)} MB`;
                    }
                }
            }
        },
        maintainAspectRatio: false
    }

    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 p-8 ml-64"> {/* ml-64 to offset the fixed sidebar width */}
                <ToastContainer theme="dark"/>
                {pathname !== '/admin/addWallpaper' && (
                    <div>
                        <h3 className="text-3xl font-semibold mb-6">Dashboard</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-lg">Total Wallpapers</p>
                                        <h4 className="text-2xl font-bold text-white mt-2">{wallpaperCount}</h4>
                                    </div>
                                    <div className="bg-white/90 p-3 rounded">
                                        <Image 
                                            src={assets.folder} 
                                            alt="wallpaper icon" 
                                            width={30} 
                                            height={30}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-lg">Total Downloads</p>
                                        <h4 className="text-2xl font-bold text-white mt-2">{totalDownloads}</h4>
                                    </div>
                                    <div className="bg-white/90 p-3 rounded">
                                        <Image 
                                            src={assets.downloads} 
                                            alt="downloads icon" 
                                            width={30} 
                                            height={30}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-lg">Today's Date</p>
                                        <h4 className="text-2xl font-bold text-white mt-2">
                                            {new Date().toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </h4>
                                    </div>
                                    <div className="bg-white/90 p-3 rounded">
                                        <Image 
                                            src={assets.calendar} 
                                            alt="calendar icon" 
                                            width={30} 
                                            height={30}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-gray-400 text-lg">Storage Used</p>
                                        <h4 className="text-2xl font-bold text-white mt-2">{storageUsed}</h4>
                                    </div>
                                    <div className="bg-white/90 p-3 rounded">
                                        <Image 
                                            src={assets.storage} 
                                            alt="storage icon" 
                                            width={30} 
                                            height={30}
                                        />
                                    </div>
                                </div>
                                <div className="h-32 relative">
                                    <Doughnut data={chartData} options={chartOptions} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm text-gray-400">
                                            {((storageValue / 512) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}