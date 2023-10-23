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
        <div className='cursor-pointer group border-[1px] border-slate-300 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm text-slate-700 relative'>
            <div className='flex flex-col items-center w-full gap-3'>
                <div className='aspect-square overflow-hidden relative w-full'>
                    <Link to={`/product/${product._id}`}>
                        <img
                            className='object-cover h-full w-full rounded'
                            src={product.image}
                            alt={product.name}
                        />
                    </Link>
                </div>
                <div className='flex flex-col items-center gap-6'>
                    <Link to={`/product/${product._id}`}>
                        <p className='text-lg font-semibold h-10'>
                            {product.name}
                        </p>
                    </Link>
                    <div>
                        <Rating
                            rating={product.rating}
                            numberOfReviews={product.numberOfReviews}
                        />
                    </div>
                </div>
                <div>
                    <Badge countInStock={product.countInStock} />
                </div>
                <div className='text-2xl font-semibold'>
                    ${product.price}
                </div>
                <div className='hidden absolute items-center right-0 pr-2 group-hover:block'>
                    <Button
                        onClick={() => addToCartHandler(product._id, product.name)}
                        type='button'
                        outline
                        disabled={product.countInStock === 0}
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