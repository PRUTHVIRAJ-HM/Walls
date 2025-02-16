import mongoose from "mongoose";

const WallpaperSchema = new mongoose.Schema({
    title: String,
    image: String,
    downloads: {
        type: Number,
        default: 0
    },
    date:{
        type:Date,
        default:Date.now()
    }
}, {
    timestamps: true
});

const WallpaperModel = mongoose.models.wallpapers || mongoose.model("wallpapers", WallpaperSchema);
export default WallpaperModel;