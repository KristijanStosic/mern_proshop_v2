import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductsGrid from '../components/ProductsGrid'
import ProductsList from '../components/ProductsList'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PaginateProducts from '../components/PaginateProducts'
import SelectSort from '../components/SelectSort'
import GoBackButton from '../components/GoBackButton'
import ViewButtons from '../components/ViewButtons'
import Banner from '../components/Banner'

const ProductsScreen = () => {
    const [view, setView] = useState('grid')
    const [sort, setSort] = useState('')

    const { keyword, page } = useParams()

    const { data, isLoading, isFetching, error } = useGetProductsQuery({ keyword, page, sort })

    return (
        <>
            <div className='px-10 my-5'>
                
                <div className='w-[100px]'>
                    {keyword && <GoBackButton />}
                </div>

                <div className='mt-3'>
                    {/* <Banner /> */}
                </div>

                <div className='flex items-center justify-between'>

                    <div className='flex items-center'>
                        <h1 className='text-2xl md:text-4xl font-semibold text-slate-500 mb-3'>
                            Latest Products
                        </h1>
                    </div>

                    <div className='flex items-center gap-3'>
                        <SelectSort sort={sort} setSort={setSort} />
                        <ViewButtons view={view} setView={setView} />
                    </div>

                </div>

                {isLoading || isFetching ? (
                    <Loader />
                ) : error ? (
                    <Message>{error?.data?.message || error.error}</Message>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-3'>
                            {view === 'grid' && data.products.map((product) => (
                                <div key={product._id}>
                                    <ProductsGrid product={product} />
                                </div>
                            ))}
                        </div>

                        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {view === 'list' &&
                                data.products.map((product) => {
                                    return (
                                        <div key={product._id}>
                                            <ProductsList product={product} />
                                        </div>
                                    )
                                })}
                        </div>

                        <div className='my-3'>
                            <PaginateProducts
                                page={data.page}
                                pages={data.pages}
                                keyword={keyword ? keyword : ''}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ProductsScreen