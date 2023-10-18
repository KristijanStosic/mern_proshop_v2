import { Link } from "react-router-dom"
import { CiShoppingCart } from "react-icons/ci"
import { useSelector } from "react-redux"

const CartHeaderCount = () => {
    const { cartItems } = useSelector((state) => state.cart)

    return (
        <Link to='/cart'>
            <div className='relative hover:text-slate-700 cursor-pointer'>
                <div className="text-3xl">
                    <CiShoppingCart />
                </div>
                <span className='absolute top-[-12px] right-[-12px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm'>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
            </div>
        </Link>
    )
}

export default CartHeaderCount