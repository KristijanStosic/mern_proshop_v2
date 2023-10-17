import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { addToCart } from '../slices/cartSlice'
import Rating from './Rating'
import HorizontalLine from './HorizontalLine'
import Button from './Button'
import Badge from './Badge'

const ProductsGrid = ({ product }) => {
    const { cartItems } = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const addToCartHandler = (id, name) => {
        if (cartItems.some((item) => item._id === id)) {
            toast.error(`${name} is already in your cart`)
        } else {
            dispatch(addToCart({ ...product, qty: 1 }))
            toast.success(`${name} has been added to your cart`)
        }
    }

    return (
        <div className='cursor-pointer border-[1px] border-slate-200 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm text-slate-700'>
            <div className='flex flex-col items-center w-full gap-3'>
                <div className='aspect-square overflow-hidden relative w-full'>
                    <Link to={`/product/${product._id}`}>
                        <img
                            className='object-contain fill rounded'
                            src={product.images[0].image}
                            alt={product.name}
                        />
                    </Link>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <Link to={`/product/${product._id}`}>
                        <p className='text-xl font-semibold h-10'>
                            {product.name}
                        </p>
                    </Link>
                    <div className='mt-4'>
                        <Rating
                            rating={product.rating}
                            numberOfReviews={product.numberOfReviews}
                        />
                    </div>
                </div>
                <div>
                    <Badge countInStock={product.countInStock} />
                </div>
                <div className='text-2xl font-semibold mt-2'>
                    ${product.price}
                </div>
                <div className='pb-1'>
                    <Button
                        onClick={() => addToCartHandler(product._id, product.name)}
                        type='button'
                        disabled={product.countInStock === 0}
                        buttonText='Add To Cart'
                        small
                        icon={<FaShoppingCart size={16} />}
                    >
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductsGrid