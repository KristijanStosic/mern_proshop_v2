import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'
import { PiShoppingCartLight } from 'react-icons/pi'
import { toast } from 'react-hot-toast'
import { convertToNumber } from '../utils/cartUtils'
import { clearCartItems } from '../slices/cartSlice'
import Container from '../components/Container'
import Button from '../components/Button'
import HorizontalLine from '../components/HorizontalLine'
import CartItem from '../components/CartItem'

const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const clearCartHandler = () => {
        dispatch(clearCartItems())
        toast.success('Cart cleared')
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <div className='pt-8 px-8'>
            <Container>
                {!cartItems || cartItems.length === 0 ? (
                    <div className='flex flex-col items-center'>
                        <div className='text-slate-700' style={{ fontSize: '100px'}}>
                            <PiShoppingCartLight />
                        </div>
                        <div className='text-3xl text-slate-700 font-semibold'>
                            Your cart is empty
                        </div>
                        <div>
                            <Link to='/' className='text-slate-500 flex items-center gap-1 mt-2'>
                                <FaArrowLeft />
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-center text-3xl text-slate-700 font-semibold'>Shopping Cart</h1>
                        
                        <div className='grid grid-cols-6 text-sm gap-4 pb-2 items-center mt-10 text-slate-700 font-bold'>
                            <div className='col-span-2 justify-self-start'>PRODUCT</div>
                            <div className='justify-self-center'>PRICE</div>
                            <div className='justify-self-center'>QUANTITY</div>
                            <div className='justify-self-center'>TOTAL</div>
                            <div className='justify-self-end'>REMOVE</div>
                        </div>

                        <div>
                            {cartItems.map((cartItem) => (
                                <CartItem key={cartItem._id} cartItem={cartItem} />
                            ))}
                        </div>

                        <HorizontalLine />

                        <div className='flex justify-between gap-4 py-4 text-slate-700'>

                            <div className='w-[90px]'>

                                <Button
                                    buttonText='Clear Cart'
                                    type='button'
                                    small
                                    outline
                                    onClick={clearCartHandler}
                                />

                            </div>

                            <div className='flex flex-col gap-1 items-start text-sm'>

                                <div className='flex justify-between w-full font-semibold'>
                                    <span className='text-lg'>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</span>
                                    <span className='text-lg'>${convertToNumber(cart.itemsPrice)}</span>
                                </div>

                                <p className='text-slate-500'>Taxes and shipping calculated at checkout</p>

                                <Button
                                    buttonText='Checkout'
                                    onClick={checkoutHandler}
                                />

                                <Link to='/' className='text-slate-500 flex items-center gap-1 mt-2'>
                                    <FaArrowLeft />
                                    <span>Continue Shopping</span>
                                </Link>

                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default CartScreen