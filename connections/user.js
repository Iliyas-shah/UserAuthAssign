import mongoose from "mongoose";

export function connectDB(urlDB){
    return mongoose.connect(urlDB)
}