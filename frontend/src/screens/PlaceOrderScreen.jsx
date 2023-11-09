import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'
import { addDecimals } from '../utils/cartUtils'
import CheckoutSteps from '../components/CheckoutSteps'
import Container from '../components/Container'
import GoBackButton from '../components/GoBackButton'
import Button from '../components/Button'
import LoadingButton from '../components/LoadingButton'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { paymentMethod, shippingAddress, cartItems } = cart

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [createOrder, { isLoading, error }] = useCreateOrderMutation()

    const createOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
            toast.success('Order created')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        } else if (!paymentMethod) {
            navigate('/payment')
        }
    }, [shippingAddress.address, paymentMethod, navigate])

    return (
        <div className='p-8'>

            <div className='w-[100px]'>
                <GoBackButton />
            </div>

            <Container>
                {error && <Message>{error?.data?.message || error.error}</Message>}

                <CheckoutSteps step1 step2 step3 selectedStep='place-order' />

                <div className='grid md:grid-cols-2 gap-10'>

                    <div className='flex flex-col gap-3'>

                        <div className='flex flex-col gap-2'>

                            <h1 className='text-slate-700 text-2xl font-medium'>
                                Shipping Address
                            </h1>

                            <hr /> 

                            <div className='flex flex-col text-slate-700'>

                                <p>
                                    <strong>Name: </strong>
                                    {shippingAddress.firstName} { ' ' }
                                    {shippingAddress.lastName}
                                </p>

                                <p>
                                    <strong>Address: </strong>
                                    {shippingAddress.address}
                                </p>

                                <p>
                                    <strong>Postal Code: </strong>
                                    {shippingAddress.postalCode}
                                </p>

                                <p>
                                    <strong>City: </strong>
                                    {shippingAddress.city}
                                </p>

                                <p>
                                    <strong>Country: </strong>
                                    {shippingAddress.country}
                                </p>

                                <p>
                                    <strong>Phone: </strong>
                                    {shippingAddress.phone}
                                </p>

                                <p>
                                    <strong>Email: </strong>
                                    {shippingAddress.email}
                                </p>

                                {shippingAddress.note && 
                                <p>
                                    <strong>Notes: </strong>
                                    {shippingAddress.note}
                                </p>
                                }
                            </div>

                        </div>

                        <hr />

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-slate-700 text-2xl font-medium'>
                                Payment Method
                            </h1>
                            <div className='text-slate-700'>
                                <span>
                                    Method: {paymentMethod}
                                </span>
                            </div>
                        </div>

                        <hr />

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-slate-700 text-2xl font-medium'>
                                Order Items
                            </h1>

                            {cartItems.length === 0 ? (
                                <h4 className='bg-slate-700 p-4 rounded-md uppercase text-slate-200 font-medium text-lg mt-2'>
                                    Your cart is empty!
                                </h4>
                            ) : (
                                <>
                                    {cartItems.map((item) => (
                                        <div
                                            key={item._id}
                                            className='
                                                    flex 
                                                    items-center 
                                                    justify-between 
                                                    text-slate-700
                                            '
                                        >
                                            <div
                                                className='
                                                    flex 
                                                    justify-start 
                                                    items-center 
                                                    gap-3
                                                    '
                                            >
                                                <Link to={`/product/${item._id}`}>
                                                    <div
                                                        className='
                                                        relative 
                                                        w-[50px] 
                                                        aspect-square 
                                                        overflow-hidden
                                                        '
                                                    >
                                                        <img
                                                            className='
                                                                object-cover 
                                                                h-full 
                                                                w-full 
                                                                rounded
                                                            '
                                                            src={item.image}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                </Link>
                                                <Link
                                                    className='text-md'
                                                    to={`/product/${item._id}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>

                                            <span className='font-semibold'>
                                                {item.qty} x ${item.price}
                                                {' '}
                                                = 
                                                ${addDecimals(item.qty * item.price)}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col rounded-md border-[1.2px] border-slate-300 h-max shadow-md text-slate-700'>
                        <div className='flex justify-start px-5 py-3'>
                            <h1 className='text-2xl font-medium'>
                                Order Summary
                            </h1>
                        </div>

                        <hr />

                        <div className='font-semibold'>
                            <div className='flex justify-between p-4'>
                                <span>Items: </span>
                                <span>${cart.itemsPrice}</span>
                            </div>

                            <hr />

                            <div className='flex justify-between p-4'>
                                <span>Shipping: </span>
                                <span>${cart.shippingPrice}</span>
                            </div>

                            <hr />

                            <div className='flex justify-between p-4'>
                                <span>Tax: </span>
                                <span>${cart.taxPrice}</span>
                            </div>

                            <hr />

                            <div className='flex justify-between p-4'>
                                <span>Total: </span>
                                <span>${cart.totalPrice}</span>
                            </div>
                        </div>

                        <hr />

                        <div className='p-4'>
                            <Button
                                buttonText={isLoading ? <LoadingButton /> : 'Place Order'}
                                type='button'
                                disabled={cartItems.length === 0}
                                onClick={createOrderHandler}
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default PlaceOrderScreen