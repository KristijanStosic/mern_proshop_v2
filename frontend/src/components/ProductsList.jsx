import ProductListItem from './ProductListItem'

const ProductsList = ({ product }) => {
    return (
        <div>
            <div className='grid grid-cols-6 text-sm gap-4 pb-2 items-center text-slate-700 font-bold'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>BRAND</div>
                <div className='justify-self-center'>CATEGORY</div>
                <div className='justify-self-end'>STOCK</div>
            </div>
            <div>
                <ProductListItem product={product} />
            </div>
        </div>
    )
}

export default ProductsList