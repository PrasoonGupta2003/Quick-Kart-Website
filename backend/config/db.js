import mongoose from "mongoose";

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected!");
    }catch(e){
        console.log("DB connection error!", e);
    }
}
export default connectDb;