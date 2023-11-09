import { Link, useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../slices/ordersApiSlice'
import { addDecimals } from '../utils/cartUtils'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Container from '../components/Container'
import HorizontalLine from '../components/HorizontalLine'

const OrderScreen = () => {
    const { orderId } = useParams()

    const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(orderId)

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message>{error?.data?.message || error.error}</Message>
            ) : (
                <div className='p-8'>
                    <Container>
                        <h1 className='text-slate-700 text-2xl font-medium'>
                            Order #{order._id}
                        </h1>

                        <HorizontalLine />

                        <div className='grid md:grid-cols-2 gap-8 text-slate-700 my-6'>

                            <div className='flex flex-col gap-1'>
                                <h1 className='text-2xl font-medium'>
                                    Shipping
                                </h1>

                                <HorizontalLine />

                                <p>
                                    <strong>Name: </strong>
                                    {order.user.firstName} {order.user.lastName}
                                </p>

                                <p>
                                    <strong>Email: </strong>
                                    {order.user.email}
                                </p>

                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {' '}
                                    {order.shippingAddress.postalCode}, {' '}
                                    {order.shippingAddress.city}, {' '}
                                    {order.shippingAddress.country}, { ' ' }
                                    {order.shippingAddress.phone}
                                </p>

                                {order.shippingAddress.note &&
                                    <p>
                                        <strong>Notes: </strong>
                                        {order.shippingAddress.note}
                                    </p>
                                }

                                <HorizontalLine />

                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-slate-700 text-2xl font-medium'>
                                        Payment Method
                                    </h1>

                                    <div className='text-slate-700'>
                                        <p>
                                            <strong>Method: </strong>
                                            {order.paymentMethod}
                                        </p>
                                    </div>

                                    {order.isPaid ? (
                                        <div className='text-md text-green-900 bg-rose-300 p-4 rounded-md'>
                                            Paid at {order.paidAt}
                                        </div>
                                    ) : (
                                        <div className='text-md text-rose-900 bg-rose-300 p-4 rounded-md'>
                                            Not Paid
                                        </div>
                                    )}

                                </div>

                                <HorizontalLine />
                                
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-slate-700 text-2xl font-medium'>
                                        Dispatch
                                    </h1>

                                    {order.isDispatched ? (
                                        <div className='text-md text-green-900 bg-rose-300 p-4 rounded-md'>
                                            Dispatched at {order.dispatchedAt}
                                        </div>
                                    ) : (
                                        <div className='text-md text-rose-900 bg-rose-300 p-4 rounded-md'>
                                            Not Dispatched
                                        </div>
                                    )}

                                </div>

                                <HorizontalLine />

                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-slate-700 text-2xl font-medium'>
                                        Deliver
                                    </h1>

                                    {order.isDelivered ? (
                                        <div className='text-md text-green-900 bg-rose-300 p-4 rounded-md'>
                                            Delivered at {order.deliveredAt}
                                        </div>
                                    ) : (
                                        <div className='text-md text-rose-900 bg-rose-300 p-4 rounded-md'>
                                            Not Delivered
                                        </div>
                                    )}

                                </div>

                                <HorizontalLine />

                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-slate-700 text-2xl font-medium'>
                                        Order Items
                                    </h1>

                                    <div className='flex flex-col'>
                                        {order.orderItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className='
                                                    flex 
                                                    items-center 
                                                    justify-between 
                                                    text-slate-700
                                                    border 
                                                    border-slate-[1.2px]
                                                    p-3
                                                    shadow-md
                                                    bg-white
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
                                                    <Link to={`/product/${item.product}`}>
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
                                                        className='underline text-md'
                                                        to={`/product/${item.product}`}
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
                                    </div>
                                </div>

                            </div>


                            <div className='flex flex-col rounded-md border-[1.2px] border-slate-300 h-max shadow-md text-slate-700'>

                                <div className='flex justify-start px-5 py-3'>
                                    <h1 className='text-2xl font-medium'>
                                        Order Summary
                                    </h1>
                                </div>

                                <hr />

                                <div className='flex flex-col gap-3 p-4 font-semibold'>

                                    <div className='flex justify-between'>
                                        <span>Items: </span>
                                        <span>${order.itemsPrice}</span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <span>Shipping: </span>
                                        <span>${order.shippingPrice}</span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <span>Tax: </span>
                                        <span>${order.taxPrice}</span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <span>Total: </span>
                                        <span>${order.totalPrice}</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </>
    )
}

export default OrderScreen