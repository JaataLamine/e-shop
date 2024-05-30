import mongoose from "mongoose";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    // Delete All data before importing it
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data destroy!".red.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
