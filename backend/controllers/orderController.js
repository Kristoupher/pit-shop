import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { user, orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("Aucun produit dans la commande");
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                name: x.name,
                qty: x.qty,
                image: x.image,
                price: x.price,
                size: x.size,
            })),
            user,
            shippingAddress,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderDate: Date.now(),
            orderNumber: Math.floor(Math.random() * 1000000).toString(),
            status: "payée",
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Create new orderGet logged-in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments({user: id});
    const orders = await Order.find({ user: id }).sort({ orderDate: -1 }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({orders, page, pages: Math.ceil(count / pageSize)});
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
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments({});

    const orders = await Order.find({}).populate("user", "lastname firstname email").limit(pageSize).skip(pageSize * (page - 1));
    res.json({orders, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if(order) {
        order.status = status;
        order.save();
        res.status(200).json(order);
    } else {
        throw new Error("Commande introuvable");
    }
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderStatus,
};