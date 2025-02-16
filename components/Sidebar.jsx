"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import {assets} from '@/Assets/assets'

const Sidebar = () => {
  const pathname = usePathname();

  const isActiveLink = (path) => {
    return pathname === path ? "bg-gray-700" : "hover:bg-gray-700";
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-950 text-white p-5 space-y-4 fixed">
      <Image src={assets.logo} width={80} alt='' className="bg-white p-1 rounded"/>
      <h2 className="text-xl font-bold mb-6">Walls Management Hub</h2>
      <nav className="space-y-2">
        <Link href="/admin">
          <div className={`p-3 rounded transition-colors ${isActiveLink('/admin')}`}>
            Dashboard
          </div>
        </Link>
        <Link href="/admin/addWallpaper">
          <div className={`p-3 rounded transition-colors ${isActiveLink('/admin/addWallpaper')}`}>
            Upload Wallpaper
          </div>
        </Link>
        <Link href="/admin/management">
          <div className={`p-3 rounded transition-colors ${isActiveLink('/admin/management')}`}>
            Content Manager
          </div>
        </Link>
      </nav>
      
      {/* Back button at bottom */}
      <div className="absolute bottom-5 left-5 right-5">
        <Link href="/">
          <div className="p-3 rounded transition-colors bg-gray-700 hover:bg-slate-500 text-center">
          Back to Home
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
