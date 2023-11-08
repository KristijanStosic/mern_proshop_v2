import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems: orderItems.map((order) => ({
                ...order,
                product: order._id,
                _id: undefined
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            user: req.user._id
        })

        for (const item of orderItems) {
            const product = await Product.findById(item._id)

            if (product) {
                product.countInStock -= item.qty
                await product.save()
            } else {
                res.status(404)
                throw new Error('Product not found')
            }
        }

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).select('-paymentResult')

    if (!orders?.length) {
        res.status(404)
        throw new Error('You have no orders yet')
    }
        
    res.status(200).json(orders)
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find()
        .populate('user', 'firstName lastName email')
        .select('-paymentResult')

    if (!orders?.length) {
        res.status(404)
        throw new Error('Orders not found')
    }
        
    res.status(200).json(orders)
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'firstName lastName email')
        .select('-paymentResult')

    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }
  
    res.status(200).json(order)
}

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    res.send('update order to paid')
}

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    res.send('update order to delivered')
}

// @desc    Update order to dispatched
// @route   PUT /api/orders/:id/dispatch
// @access  Private/Admin
const updateOrderToDispatched = async (req, res) => {
    res.send('update order to dispatched')
}

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
    res.send('delete order')
}

export {
    createOrder,
    getMyOrders,
    getOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToDispatched,
    updateOrderToPaid,
    deleteOrder
}