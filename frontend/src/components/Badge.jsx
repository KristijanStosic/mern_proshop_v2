import { FaCheck, FaTimes } from "react-icons/fa"

const Badge = ({ countInStock }) => {
    return (
        <>
            {countInStock > 0 ? (
                <span className="inline-flex items-center bg-cyan-700 text-xs font-medium text-slate-100 px-2 py-1.5 rounded"><FaCheck className='mr-1' color='text-teal-100' size={16} />
                    {countInStock} piece(s) left
                </span>
            ) : (
                <span className="inline-flex items-center bg-red-700 text-red-200 text-xs font-medium px-2 py-1.5 rounded"><FaTimes className='mr-1' color='text-red-100' size={16} />
                    Out of stock 
                </span>
            )}
        </>
    )
}

export default Badge