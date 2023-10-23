import ProductListItem from './ProductListItem'

const ProductsList = ({ product }) => {
    return (
        <div>
            <div className='grid grid-cols-6 text-sm gap-4 pb-3 text-slate-700 font-bold'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>CATEGORY / BRAND / MODEL</div>
                <div className='justify-self-center'>STOCK</div>
                <div className='justify-self-end'></div>
            </div>
            <div className='pb-3'>
                <ProductListItem product={product} />
            </div>
        </div>
    )
}

export default ProductsList