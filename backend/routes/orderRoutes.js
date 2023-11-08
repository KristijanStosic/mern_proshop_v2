import express from 'express'
const router = express.Router() 
import { createOrder, getOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToDispatched, updateOrderToPaid, deleteOrder } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/', protect, createOrder)
router.get('/', protect, admin, getOrders)
router.get('/my-orders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/dispatch', protect, admin, updateOrderToDispatched)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
router.delete('/:id', protect, admin, deleteOrder)

export default router