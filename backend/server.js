import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import uploadRoutes from './routes/uploadRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const port = process.env.PORT || 5000

await connectDB()

const app = express()

/*app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next() 
  } else {
    express.json()(req, res, next)
  }
})*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Cookie parser middleware
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...'})
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}...`)
})