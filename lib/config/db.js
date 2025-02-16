import mongoose from 'mongoose';

export const ConnectDB =  async()=>{
    await mongoose.connect('mongodb+srv://cyberguy:cKTxApPCN5bmDubG@cluster561.hqovu.mongodb.net/walls');
    console.log("DB is Connected");
}