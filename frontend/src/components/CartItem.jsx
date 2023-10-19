import { convertToNumber } from "../utils/cartUtils"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../slices/cartSlice"
import { toast } from "react-hot-toast"
import { FaTrash } from "react-icons/fa"
import SelectQuantity from "./SelectQuantity"

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch()

    // If i want to use select list with options based on how many products are available in stock (if 5 products, than 5 options from 1 to 5) and use function below (removeFromCartHandle, and clear cart stays the same)

    /*const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }*/

    const increaseQty = (product) => {
        const updatedQty = product.qty + 1
        if (updatedQty <= product.countInStock) {
            dispatch(addToCart({ ...product, qty: updatedQty }))
        }
    }

    const decreaseQty = (product) => {
        const updatedQty = product.qty - 1
        if (product) {
            if (product.qty > 1) {
                dispatch(addToCart({ ...product, qty: updatedQty }))
            } else {
                dispatch(removeFromCart(product._id))
                toast.success(`${product.name} has been removed from cart`)
            }
        }
    }
    
    const removeFromCartHandler = (id, name) => {
        dispatch(removeFromCart(id))
        toast.success(`${name} has been removed from your cart`)
    }

    /*const decreaseQty1 = (id) => {
        const item = cartItems.find((item) => item._id === id)
        const updatedQty = item.qty - 1
        if (item) {
            if (item.qty > 1) {
                dispatch(addToCart({ ...item, qty: updatedQty }))
            } else {
                dispatch(removeFromCart(item._id))
                toast.success(`${item.name} has been removed from cart`)
            }
        }
    }*/

    return (
        <div className="grid grid-cols-6 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 pt-4 mt-4 items-center text-slate-700">
            <div className="col-span-2 justify-self-start flex items-center gap-2 md:gap-4">
                <Link to={`/product/${cartItem._id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <img className="fill object-contain rounded" src={cartItem.images[0].image} alt={cartItem.name} />
                    </div>
                </Link>
                <Link className="font-semibold" to={`/product/${cartItem._id}`}>
                    {cartItem.name}
                </Link>
            </div>
            <div className="justify-self-center font-semibold">${convertToNumber(cartItem.price)}</div>
            <div className="justify-self-center">
                <SelectQuantity 
                    qty={cartItem.qty} 
                    countInStock={cartItem.countInStock} 
                    increaseQty={() => increaseQty(cartItem)} 
                    decreaseQty={() => decreaseQty(cartItem)}
                />
                {/* <select
                    aria-label="Default select example"
                    className='cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md px-5 py-2'
                    value={cartItem.qty}
                    onChange={(e) =>
                        addToCartHandler(cartItem, Number(e.target.value))
                    }
                >
                    {[...Array(cartItem.countInStock).keys()].map(
                        (x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        )
                    )}
                </select> */}
            </div>
            <div className="justify-self-center font-semibold">
                ${convertToNumber(cartItem.qty * cartItem.price)}
            </div>
            <div className="justify-self-end">
                <FaTrash onClick={() => removeFromCartHandler(cartItem._id, cartItem.name)} className="text-slate-700 cursor-pointer hover:opacity-75" size={24} />
            </div>
        </div>
        )
}

export default CartItem