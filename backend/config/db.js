import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://alamine:eshop2024@cluster0.u47fjte.mongodb.net/eshop?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
