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
        <div className="grid grid-cols-6 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-3 items-center text-slate-700">
            <div className="col-span-2 justify-self-start flex items-center gap-2 sm:gap-8 md:gap-4">
                <Link to={`/product/${product._id}`}>
                    <div className="relative w-[100px] aspect-square overflow-hidden">
                        <img className="object-cover h-full w-full rounded" src={product.image} alt={product.name} />
                    </div>
                </Link>
                <Link className="font-semibold text-lg" to={`/product/${product._id}`}>
                    {product.name}
                </Link>
            </div>
            <div className="justify-self-center font-semibold text-md">${convertToNumber(product.price)}</div>
            <div className="justify-self-center font-semibold">
                <div className="flex flex-col">
                    <span>{product.category}</span>
                    <span>{product.brand}</span>
                    <span>{product.model}</span>
                </div>
            </div>
            <div className="justify-self-center">
                <Badge countInStock={product.countInStock} />
            </div>
            <div className="justify-self-end">
                <div className="flex flex-col justify-between gap-3">
                    <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
                    <Button
                        onClick={() => addToCartHandler(product._id, product.name)}
                        type='button'
                        disabled={product.countInStock === 0}
                        buttonText='Add To Cart'
                        small
                        icon={<FaShoppingCart size={16} />}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductListItem