import express from 'express'
const router = express.Router() 
import { getProducts, getProductById, createProduct, createProductReview, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, admin, createProduct)
router.post('/:id/new-review', protect, createProductReview)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)

export default router