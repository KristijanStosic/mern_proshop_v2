import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaList, FaTh } from 'react-icons/fa'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductsGrid from '../components/ProductsGrid'
import ProductsList from '../components/ProductsList'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import SelectSort from '../components/SelectSort'
import GoBackButton from '../components/GoBackButton'

const ProductsScreen = () => {
    const [view, setView] = useState('grid')
    const [sort, setSort] = useState('')

    const { keyword, page } = useParams()

    const { data, isLoading, isFetching , error } = useGetProductsQuery({ keyword, page, sort })

    return (
        <>
        {keyword && <GoBackButton />}
            <Row>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1>Latest Products</h1>
                    <div className='d-flex justify-content-center align-items-center'>
                        <SelectSort sort={sort} setSort={setSort} />
                        <ButtonGroup aria-label="Basic example" size='md' role='group'>
                            <OverlayTrigger overlay={<Tooltip>Grid view</Tooltip>}>
                                <Button variant='light' border='light' type='button' onClick={() => setView('grid')}>
                                    <FaTh />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip>List view</Tooltip>}>
                                <Button variant='light' border='light' type='button' onClick={() => setView('list')} >
                                    <FaList />
                                </Button>
                            </OverlayTrigger>
                        </ButtonGroup>
                    </div>
                </div>
            </Row>
            {isLoading || isFetching  ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <Row>
                        {view === 'grid' && data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductsGrid product={product} />
                            </Col>
                        ))}
                        {view === 'list' &&
                            data.products.map((product, index) => {
                                return (
                                    <Col key={index} sm={12} md={12} lg={12} xl={12}>
                                        <ProductsList product={product} />
                                    </Col>
                                )
                            })}
                    </Row>
                    <Paginate
                        page={data.page}
                        pages={data.pages}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default ProductsScreen