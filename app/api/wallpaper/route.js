import { ConnectDB } from "@/lib/config/db";
import WallpaperModel from "@/lib/models/WallpaperModel";
import {writeFile} from 'fs/promises';
import { promises as fs } from 'fs';
const{NextResponse} = require("next/server");


const LoadDB = async()=>{
    await ConnectDB();
}
LoadDB();

export async function GET(request){
    const wallpaperId = request.nextUrl.searchParams.get("id");
    const getCount = request.nextUrl.searchParams.get("count");
    const getStorage = request.nextUrl.searchParams.get("storage");
    const getDownloads = request.nextUrl.searchParams.get("downloads");

    if (getStorage === 'true') {
        const wallpapers = await WallpaperModel.find({}, 'image');
        // Calculate total storage in KB first
        const totalStorageBytes = (await Promise.all(wallpapers.map(async (wallpaper) => {
            try {
                const stats = await fs.stat(`./public${wallpaper.image}`);
                return stats.size;
            } catch (error) {
                return 0;
            }
        }))).reduce((acc, size) => acc + size, 0);
        
        // Convert to appropriate unit (KB or MB)
        let storage;
        if (totalStorageBytes < 1024 * 1024) { // If less than 1MB
            storage = (totalStorageBytes / 1024).toFixed(2) + ' KB';
        } else {
            storage = (totalStorageBytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
        
        return NextResponse.json({ storage });
    }
    
    if (getCount === 'true') {
        const count = await WallpaperModel.countDocuments();
        return NextResponse.json({ count });
    }
    
    if (getDownloads === 'true') {
        const totalDownloads = await WallpaperModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$downloads" }
                }
            }
        ]);
        return NextResponse.json({ 
            downloads: totalDownloads[0]?.total || 0 
        });
    }
    
    if(wallpaperId){
        const wallpaper = await WallpaperModel.findById(wallpaperId);
        return NextResponse.json(wallpaper);
    }
    else{
        const wallpapers = await WallpaperModel.find({});
        return NextResponse.json({wallpapers})
    }
}


export async function POST(request){
    const formData = await request.formData();
    const timestamp = Date.now()
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    const WallpaperData={
        title:`${formData.get('title')}`,
        image:`${imgUrl}`
    }
    await WallpaperModel.create(WallpaperData);
    console.log("Wallpaper Uploaded");
    return NextResponse.json({success:true,msg:"Upload Successfull"})
}

export async function PATCH(request) {
    const { wallpaperId } = await request.json();
    
    try {
        await WallpaperModel.findByIdAndUpdate(
            wallpaperId,
            { $inc: { downloads: 1 } }
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function DELETE(request) {
    const wallpaperId = request.nextUrl.searchParams.get("id");

    if (!wallpaperId) {
        return NextResponse.json({ success: false, msg: "No ID provided" }, { status: 400 });
    }

    try {
        await WallpaperModel.findByIdAndDelete(wallpaperId);
        return NextResponse.json({ success: true, msg: "Wallpaper deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}

