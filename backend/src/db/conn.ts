import mongoose from "mongoose";

async function main() {
    mongoose.connect(process.env.MONGO_URI!);
    mongoose.connection.on("connected", () => {
     console.log("MongoDB connected at port 27017");
   });
}

export default main;