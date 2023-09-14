import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        orderDate: {
            type: Date,
            required: true,
        },
        orderNumber: {
            type: String,
            required: true,
        },
        price: {
            priceHt: { type: Number, required: true},
            taxe: { type: Number, required: true},
            shipping: { type: Number, required: true},
            priceTotal: { type: Number, required: true},
        },
        product: [
            {
                productId: { type: String, required: true},
                quantity: { type: Number, required: true},
                size: { type: String, required: true},
            }
        ],
        shippingAddress: {
            street: { type: String, required: true},
            city: { type: String, required: true},
            postalCode: { type: Number, required: true},
        },
        status: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;