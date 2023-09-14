import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        lastname: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        mail:  {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
                street: { type: String, required: true},
                city: { type: String, required: true},
                postalCode: { type: Number, required: true},
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;