import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaMinus, FaPlus, FaTrash, FaTruck } from 'react-icons/fa'
import { addToCart, removeFromCart, clearCartItems, toggleCartSidebar } from '../slices/cartSlice'
import { toast } from 'react-hot-toast'
import { convertToNumber } from '../utils/cartUtils'
import Message from '../components/Message'

const CartSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems, cartSidebar } = cart

    // If i want to use select list with options based on how many products are available in stock (if 5 products, than 5 options from 1 to 5) and use function below (removeFromCartHandle, and clear cart stays the same)

    /*const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }*/

    const removeFromCartHandler = (id, name) => {
        dispatch(removeFromCart(id))
        toast.success(`${name} has been removed from your cart`)
    }

    const clearCartHandler = () => {
        dispatch(closeCartSideBar())
        dispatch(clearCartItems())
        toast.success('Cart cleared')
    }

    const increaseQty = (product) => {
        const updatedQty = product.qty + 1
        if (updatedQty <= product.countInStock) {
            dispatch(addToCart({ ...product, qty: updatedQty }))
        }
    }

    const decreaseQty = (id) => {
        const item = cartItems.find((item) => item._id === id)
        const updatedQty = item.qty - 1
        if (item) {
            if (item.qty > 1) {
                dispatch(addToCart({ ...item, qty: updatedQty }))
            } else {
                dispatch(removeFromCart(item._id))
                toast.success(`${item.name} has been removed from cart`)
                dispatch(closeCartSideBar())
            }
        }
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <Row>
            <div className={`sidebar ${cartSidebar ? 'open' : ''}`}>
                <Col>
                    <div className="d-flex justify-content-end mb-5">
                        <Button type='button' onClick={() => dispatch(toggleCartSidebar())}>X</Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='text-primary' style={{ marginBottom: '20px' }}>Shopping Cart</h3>
                        <Button type='button' variant='primary' hidden={cartItems.length <= 0} onClick={clearCartHandler}>Clear Cart</Button>
                    </div>
                    {cartItems.length <= 0 ? (
                        <Message>
                            Your cart is empty! <Link to='/'>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {/* cartItems is a list of products, item === product */}
                            {cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row className='d-flex justify-content-center align-items-center'>
                                        <Col>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col className='text-primary'>${item.price}</Col>
                                        <Col className='d-flex gap-2'>
                                            <Button
                                                onClick={() => decreaseQty(item._id)}
                                                variant='primary'
                                                size='sm'
                                                type='button'> <FaMinus />
                                            </Button>
                                            <Form.Control
                                                type='text'
                                                readOnly
                                                className='text-center'
                                                value={item.qty}
                                                style={{ width: '60px' }}
                                                size='sm' />
                                            <Button
                                                onClick={() => increaseQty(item)}
                                                disabled={item.qty >= item.countInStock}
                                                variant='primary'
                                                size='sm'
                                                type='button'> <FaPlus />
                                            </Button>
                                            {/* If i want to use select list with options based on how many products are available in stock (if 5 products, than 5 options from 1 to 5) */}
                                            {/* <Form.Select
                                            className='text-center'
                                            value={item.qty}
                                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Select> */}
                                        </Col>
                                        <Col>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item._id, item.name)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h6>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                    items
                                </h6>
                                Items price: ${convertToNumber(cart.itemsPrice)}
                                {/* {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} */}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                        type='button'
                                        className='btn-block btn'
                                        disabled={cartItems.length <= 0}
                                        onClick={checkoutHandler}
                                    >
                                        Proceed To Checkout
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <div className="mt-2">
                        <Message><FaTruck /> Delivery within 1-2 weeks</Message>
                    </div>
                </Col>
            </div>
        </Row>
    )
}

export default CartSidebar