import mongoose from "mongoose";

async function db_connect() {
  try {
    await mongoose.connection.on("connected", () => {
      console.log("MongoDB connected at port 27017");
    });
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log("Connection Error: ", error);
    throw Error("Unable to connect with MongoDB database");
  }
}

export default db_connect;
