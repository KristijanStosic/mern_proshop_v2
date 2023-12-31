import { Link } from 'react-router-dom'
import { FaTruck } from 'react-icons/fa'
import { MdPayment, MdShoppingCart } from 'react-icons/md'

const CheckoutSteps = ({ step1, step2, step3, selectedStep }) => {
    return (
        <ol
            className='
                flex 
                items-center 
                justify-center
                gap-6
                font-medium 
                text-lg
                text-slate-400
                mb-6
            '
        >
            {step1 ? (
                <li className={`
                    ${step1 ? 'text-slate-700' : ''}
                    ${selectedStep === 'shipping' ? 'border-b-2 border-slate-700' : ''}
                `}
                >
                    <Link to='/shipping'>
                        <span className='inline-flex items-center gap-1'>
                            <FaTruck size={20} /> Shipping
                        </span>
                    </Link>
                </li>
            ) : (
                <>
                    <li>
                        <span className='inline-flex items-center gap-1'>
                            <FaTruck size={20} /> Shipping
                        </span>
                    </li>
                </>
            )}

            {step2 ? (
                <>
                    <li className={`
                        ${step2 ? 'text-slate-700' : ''}
                        ${selectedStep === 'payment' ? 'border-b-2 border-slate-700' : ''}
                    `}>
                        <Link to='/payment'>
                            <span className='inline-flex items-center gap-1'>
                                <MdPayment size={20} /> Payment
                            </span>
                        </Link>
                    </li>
                </>
            ) : (
                <li>
                    <span className='inline-flex items-center gap-1' disabled>
                        <MdPayment size={20} /> Payment
                    </span>
                </li>
            )}

            {step3 ? (
                <>
                    <li className={`
                        ${step3 ? 'text-slate-700' : ''}
                        ${selectedStep === 'place-order' ? 'border-b-2 border-slate-700' : ''}
                    `}>
                        <Link to='/place-order'>
                            <span className='inline-flex items-center gap-1'>
                                <MdShoppingCart size={20} /> Place Order
                            </span>
                        </Link>
                    </li>
                </>
            ) : (
                <li>
                    <span className='inline-flex items-center gap-1'>
                        <MdShoppingCart size={20} /> Place Order
                    </span>
                </li>
            )}

        </ol>
    )
}

export default CheckoutSteps