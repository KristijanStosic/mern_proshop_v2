import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from "react-redux"

const CartHeaderCount = () => {
    const { cartItems } = useSelector((state) => state.cart)
    
    return (
    <Link to='/cart'>
        <div className='relative hover:text-slate-700 cursor-pointer'>
            <FaShoppingCart size={24} />
            <span className='absolute top-[-15px] right-[-15px] bg-cyan-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm'>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </span>
        </div>
    </Link>
    )
}

export default CartHeaderCount