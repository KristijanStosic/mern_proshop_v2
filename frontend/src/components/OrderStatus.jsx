import { FaCheck, FaTimes } from "react-icons/fa"

const OrderStatus = ({ orderStatus }) => {
    return (
        <div className="flex items-center justify-center">
            {orderStatus ? (
                <FaCheck className="text-green-600" />
            ) : (
                <FaTimes className="text-rose-600" />
            )}
        </div>
    )
}

export default OrderStatus