import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        sizes: [
            {
                name: { type: String, required: true},
                quantityInStock: { type: Number, required: true},
            }
        ],
        team: {
            type: String,
            required: false,
        },
        driver: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;