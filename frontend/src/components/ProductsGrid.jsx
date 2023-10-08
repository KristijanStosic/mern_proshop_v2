import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { addToCart } from '../slices/cartSlice'
import Rating from './Rating'

const ProductsGrid = ({ product }) => {
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
            <Link to={`/product/${product._id}`}>
                <OverlayTrigger overlay={
                    <Tooltip>Click to see the product info</Tooltip>}
                >
                    <Card.Img src={product.image} variant='top' />
                </OverlayTrigger>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' className='product-title'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
                </Card.Text>

                {product.countInStock > 0 
                    ?   <Card.Text as='small' className='fw-semibold'>
                            Available {product.countInStock} piece(s)
                        </Card.Text> 
                    :   <Card.Text as='small' style={{ color: 'crimson' }} className='fw-bold'>
                            Out of stock
                        </Card.Text>
                }

                <Card.Text as='h4'>
                    ${product.price}
                </Card.Text>

                <div className='d-flex gap-1'>
                    <OverlayTrigger overlay={
                        <Tooltip>Add to cart</Tooltip>}
                    >
                        <Button 
                            disabled={product.countInStock <= 0} 
                            className='w-100' 
                            size='sm' 
                            onClick={() => addToCartHandler(product._id, product.name)}><FaShoppingCart />
                        </Button>
                    </OverlayTrigger>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductsGrid