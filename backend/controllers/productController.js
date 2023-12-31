import Product from "../models/productModel.js"
import User from "../models/userModel.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.page) || 1
  const limit = pageSize
  const skip = (page - 1) * pageSize

  const searchCriteria = {}

  if (req.query.keyword) {
    searchCriteria.$or = [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { brand: { $regex: req.query.keyword, $options: 'i' } },
      { category: { $regex: req.query.keyword, $options: 'i' } },
      { model: { $regex: req.query.keyword, $options: 'i' } }
    ]
  }

  let sortOptions = {}

  if (req.query.sort) {
    const sortFields = req.query.sort.split(',').join(' ')
    sortOptions = sortFields
  } else {
    sortOptions = '-createdAt'
  }

  const count = await Product.countDocuments({ ...searchCriteria })
  const products = await Product.find({ ...searchCriteria })
    .sort(sortOptions)
    .limit(limit)
    .skip(skip)

  if (!products?.length) {
    res.status(404)
    throw new Error('Products not found!')
  }

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', '-password')

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  return res.status(200).json(product)
}

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  const { name, price, image, brand, category, model, countInStock, description } = req.body

  const product = await Product.create({
    name,
    price,
    image,
    brand,
    category,
    model,
    countInStock,
    description,
    user: req.user._id
  })

  if (product) {
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } else {
    res.status(400)
    throw new Error('Invalid product data')
  }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, model, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.model = model
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()

    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

// @desc    Create new review
// @route   POST /api/products/:id/new-review
// @access  Private
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  const user = await User.findById(req.user._id)

  if (user.isAdmin) {
    res.status(404)
    throw new Error('Admin cannot review product')
  }

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.firstName + ' ' + req.user.lastName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numberOfReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview }