import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaShoppingCart } from "react-icons/fa"
import { convertToNumber } from "../utils/cartUtils"
import { addToCart } from "../slices/cartSlice"
import { toast } from "react-hot-toast"
import Rating from "./Rating"
import Button from "./Button"
import Badge from "./Badge"

const ProductListItem = ({ product }) => {
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
        <div className="grid grid-cols-6 text-xs md:text-sm gap-4 py-4 border-t-[1px] border-slate-300 items-center text-slate-700">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link to={`/product/${product._id}`}>
                    <div className="w-[100px] h-[100%]">
                        <img className="fill object-contain rounded" src={product.images[0].image} alt={product.name} />
                    </div>
                </Link>
                <div className='flex flex-col justify-between gap-4'>
                    <Link className="font-semibold" to={`/product/${product._id}`}>
                        {product.name}
                    </Link>
                    <div>
                        <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
                    </div>
                    <div className='w-[120px]'>
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
            <div className="justify-self-center font-semibold">
                ${convertToNumber(product.price)}
            </div>
            <div className="justify-self-center font-semibold">
                {product.brand}
            </div>
            <div className="justify-self-center font-semibold">
                {product.category}
            </div>
            <div className="justify-self-end">
                <Badge countInStock={product.countInStock} />
            </div>
        </div>
    )
}

export default ProductListItem