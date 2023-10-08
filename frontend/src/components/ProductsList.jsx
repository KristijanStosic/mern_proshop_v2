import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { addToCart } from '../slices/cartSlice'
import { Card, Row, Col, OverlayTrigger, Tooltip, Image, ListGroup, Button } from 'react-bootstrap'
import { FaEye, FaShoppingCart } from 'react-icons/fa'
import Rating from './Rating'

const ProductsList = ({ product }) => {
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
        <Card className='my-3 p-3 rounded'>
            <Row className='gap-3'>
                <Col md={4}>
                    <Link to={`/product/${product._id}`}>
                        <OverlayTrigger overlay={
                            <Tooltip>Click to see the product info</Tooltip>}
                        >
                            <Image src={product.image} alt={product.name} fluid />
                        </OverlayTrigger>
                    </Link>
                </Col>
                <Col sx={12}>
                    <ListGroup variant='flush'>
                        <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
                        <Link to={`/product/${product._id}`}><h3>{product.name}</h3></Link>

                        <ListGroup.Item>
                            Price: <strong>${product.price}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.countInStock > 0 ? <Card.Text as='small' className='fw-semibold'>
                                Available {product.countInStock} piece(s)
                            </Card.Text> : <Card.Text style={{ color: 'crimson' }} className='fw-bold'>Out of stock</Card.Text>}
                        </ListGroup.Item>
                    </ListGroup>
                    <Row>
                        <Col md={6} className='d-flex gap-1'>
                            <OverlayTrigger overlay={
                                <Tooltip>Add to cart</Tooltip>}
                            >
                                <Button
                                    className='w-100'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    onClick={() => addToCartHandler(product._id, product.name)}
                                >
                                    <FaShoppingCart />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={
                                <Tooltip>View {product.name}</Tooltip>}>
                                <Link to={`/product/${product._id}`} className='btn btn-primary w-100'>
                                    <FaEye />
                                </Link>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

export default ProductsList