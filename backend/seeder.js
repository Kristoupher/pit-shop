import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import categories from "./data/categories.js";
import products from "./data/products.js";
import Category from "./models/categoryModel.js";
import connectDB from './config/db.js';
import Product from "./models/productModel.js";

dotenv.config();

connectDB();

const importData = async() => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();

        await Category.insertMany(categories);
        await Product.insertMany(products);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await Category.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}