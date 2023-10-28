import express from 'express'
const router = express.Router() 
import { getProducts, getProductById, createProduct, createProductReview } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, admin, createProduct)
router.post('/:id/new-review', protect, createProductReview)

export default router