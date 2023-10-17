const btnStyles = 'border-[1.2px] px-4 py-1 border-slate-400 px-2 rounded-md text-slate-700 font-bold disabled:opacity-75 disabled:cursor-not-allowed'

const SelectQuantity = ({ increaseQty, decreaseQty, qty, countInStock }) => {
    return (
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-base">
                <button className={btnStyles} onClick={decreaseQty}>-</button>
                <div>{qty}</div>
                <button 
                disabled={qty >= countInStock} 
                className={btnStyles} 
                onClick={increaseQty}>+</button>
            </div>
        </div>
    )
}

export default SelectQuantity