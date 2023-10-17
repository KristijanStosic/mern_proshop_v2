import { useState } from 'react'
import { useParams } from 'react-router-dom'
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

    const { data, isLoading, isFetching, error } = useGetProductsQuery({ keyword, page, sort })

    return (
        <>
            {keyword && <GoBackButton />}
            <div className='px-12 py-6'>
                    <div>
                        {/* <Banner /> */}
                    </div>

                    <div className='flex items-center justify-between'>

                        <div className='flex items-center justify-start'>
                            <h1 className='text-3xl md:text-4xl font-semibold text-slate-500 mb-4'>Latest Products</h1>
                        </div>

                        <div className='flex items-center gap-3'>
                            <SelectSort sort={sort} setSort={setSort} />
                            <div className='flex items-center gap-3'>
                                <button className={`${view === 'grid' ? 'bg-slate-700 p-[7px] rounded text-white hover:bg-slate-700' : 'bg-slate-50'
                                    }`} type='button' onClick={() => setView('grid')}>
                                    <FaTh />
                                </button>
                                <button data-tooltip-trigger={'hover'} data-tooltip-target="tooltip-list" className={`${view === 'list' ? 'bg-slate-700 p-[7px] rounded text-white hover:text-white' : 'bg-slate-50 '
                                    }`} type='button' onClick={() => setView('list')} >
                                    <FaList />
                                </button>

                                <div id="tooltip-list" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-75 tooltip dark:bg-gray-700">
                                    List View
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
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
                            <div className='mt-3'>
                                <Paginate
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