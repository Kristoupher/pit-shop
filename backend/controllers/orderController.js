import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderDate, orderNumber, price, products, shippingAddress, status } = req.body;

    if (products && products.length === 0) {
        res.status(400);
        throw new Error("Aucun produit dans la commande");
    } else {
        const order = new Order({
            orderDate,
            orderNumber,
            price,
            products,
            shippingAddress,
            status,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Create new orderGet logged-in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "lastname firstname email");

    if(order) {
        res.status(200).json(order);
    } else {
        throw new Error("Commande introuvable");
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "lastname firstname email");
    res.status(200).json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
};