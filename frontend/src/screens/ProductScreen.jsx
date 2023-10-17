import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import { FaEye, FaShoppingCart } from 'react-icons/fa'
import Rating from '../components/Rating'
import Container from '../components/Container'
import GoBackButton from '../components/GoBackButton'
import Loader from '../components/Loader'
import Message from '../components/Message'
import HorizontalLine from '../components/HorizontalLine'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { toast } from 'react-hot-toast'

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
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className='p-8'>
            <Container>
              <div className='w-[100px]'>
                <GoBackButton />
              </div>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-3'>
                <div><img src={product.images[0].image} /></div>
                <div className='flex flex-col gap-1 text-sm text-slate-700'>
                  <h2 className='text-2xl font-semibold'>
                    {product.name}
                  </h2>
                  <div className='mt-2'>
                    <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
                  </div>
                  <HorizontalLine />
                  <div className='flex justify-between'>
                    <div className='text-lg'>
                      <span className='font-semibold'>CATEGORY: </span>{product.category}
                    </div>
                    <div className='text-lg'>
                      <span className='font-semibold'>BRAND: </span>{product.brand}
                    </div>
                  </div>
                  <HorizontalLine />
                  <div className='text-justify text-xl'>
                    <span className='font-bold'>DESCRIPTION: </span>{product.description}
                  </div>
                  <HorizontalLine />
                </div>
                <div className='h-max px-6 py-3 bg-white border border-gray-200 rounded-md shadow-md'>
                  <div className='text-2xl text-slate-700'>
                    <span className='font-semibold'>PRICE: </span> ${product.price}
                  </div>
                  <HorizontalLine />
                  <div>
                    <span className='font-semibold'>Available: </span>
                    <Badge countInStock={product.countInStock} />
                    <HorizontalLine />

                    <span className='font-semibold'>Quantity: </span>
                    <select
                      aria-label="Default select example"
                      className='cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md px-5 py-1 ml-2'
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
                    </select>
                    <HorizontalLine />
                  </div>

                  <div>
                    <Button
                      onClick={() => addToCartHandler(product._id, product.name)}
                      type='button'
                      disabled={product.countInStock === 0}
                      buttonText='Add To Cart'
                      icon={<FaShoppingCart size={16} />}
                    >
                      <FaShoppingCart />
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  )
}

export default ProductScreen