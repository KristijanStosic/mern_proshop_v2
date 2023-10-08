import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useGetProductByIdQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import Rating from '../components/Rating'
import GoBackButton from '../components/GoBackButton'
import Loader from '../components/Loader'
import Message from '../components/Message'
import toast from 'react-hot-toast'

const ProductScreen = () => {
  const { productId } = useParams()

  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId)

  const addToCartHandler = (id, name) => {
    if (cartItems.some((item) => item._id === id)) {
      toast.error(`${name} is already in your cart`)
    } else {
      dispatch(addToCart({ ...product, qty }))
      toast.success(`${name} has been added to your cart`)
      navigate('/cart')
    }
  }

  /*const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${name} has been added to your cart`)
    navigate('/cart');
  }*/

  return (
    <>
      <GoBackButton />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image className='rounded' src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: <strong>${product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      {product.countInStock > 0
                        ?
                        <Col className='text-success fw-bold'>
                          In Stock {product.countInStock}
                        </Col>
                        :
                        <Col style={{ color: 'crimson' }} className='fw-bold'>
                          Out of Stock
                        </Col>}
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            aria-label="Default select example"
                            size='sm'
                            className='text-center'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={() => addToCartHandler(product._id, product.name)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen