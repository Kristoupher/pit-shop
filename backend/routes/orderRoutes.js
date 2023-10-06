import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post( addOrderItems).get(protect, admin, getOrders);
router.route('/mine/:id').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById).put(protect, admin, updateOrderStatus);
export default router;