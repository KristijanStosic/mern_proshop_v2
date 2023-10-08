import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log(`Connected to MongoDB!`)
  } catch (error) {
    console.log(`Connection to MongoDB failed. Error: ${error}`)
    process.exit(1)
  }
}

export default connectDB