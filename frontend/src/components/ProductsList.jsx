import ProductListItem from './ProductListItem'

const ProductsList = ({ product }) => {
    return (
        <div>
            <div className='grid grid-cols-7 text-sm gap-4 pb-2 items-center text-slate-700 font-bold'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='col-span-3 justify-self-center'>CATEGORY / BRAND / MODEL</div>
                <div className='justify-self-end'>STOCK</div>
            </div>
            <div>
                <ProductListItem product={product} />
            </div>
        </div>
    )
}

export default ProductsList