import mongoose from "mongoose"

export const connectToDb = async () => {
    if (mongoose.connections[0].readyState) {
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("MongoDB Connected!")
        return
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throw new Error(error?.message || "Something went wrong while connecting to DB!")
        }
    }
}