import mongoose from "mongoose";

export const connectDB =async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("MongoDB connected Successfully");
    } catch (err) {
        console.log("MongoDB Server Error", err);
    }
}