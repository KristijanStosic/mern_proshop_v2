import Product from "../models/productModel.js"

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
    ];
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
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  return res.status(200).json(product)
}

export { getProducts, getProductById }