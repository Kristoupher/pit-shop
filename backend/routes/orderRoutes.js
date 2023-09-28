import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post( addOrderItems).get(getOrders);
router.route('/mine/:id').get(getMyOrders);
router.route('/:id').get(getOrderById);
export default router;