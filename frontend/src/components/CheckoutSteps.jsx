import { FaTruck } from "react-icons/fa"
import { MdPayment, MdShoppingCart } from "react-icons/md"

const CheckoutSteps = ({ step1, step2, step3, selectedStep }) => {
    return (
        <ol
            className="
                flex 
                items-center 
                justify-center
                gap-6
                font-medium 
                text-lg
                text-slate-400
                mb-6
            "
        >
            <li className={`
            ${step1 ? "text-slate-700" : ""}
            ${selectedStep === 'shipping' ? 'border-b-2 border-slate-700' : ''}
            `}
            >
                <span className="inline-flex items-center gap-1">
                    <FaTruck size={20} /> Shipping
                </span>
            </li>

            <li className={`
            ${step2 ? "text-slate-700" : ""}
            ${selectedStep === 'payment' ? 'border-b-2 border-slate-700' : ''}
            `}>
                <span className="inline-flex items-center gap-1"><MdPayment size={20} /> Payment</span>
            </li>

            <li className={`
            ${step3 ? "text-slate-700" : ""}
            ${selectedStep === 'place-order' ? 'border-b-2 border-slate-700' : ''}
            `}>
                <span className="inline-flex items-center gap-1"><MdShoppingCart size={20} /> Place Order</span>
            </li>
        </ol>
    )
}

export default CheckoutSteps