import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from "../slices/cartSlice"
import { FaCcPaypal, FaCcStripe } from "react-icons/fa"
import Button from "../components/Button"
import CheckoutSteps from "../components/CheckoutSteps"
import Container from "../components/Container"
import GoBackButton from "../components/GoBackButton"

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shippingAddress } = useSelector((state) => state.cart)

    const savePaymentMethodHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/place-order')
    }

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    return (
        <div className="p-8">
            <div className="w-[100px]">
                <GoBackButton />
            </div>
            <Container>
                <CheckoutSteps step1 step2 selectedStep='payment' />
                <h1
                    className="
                        mb-4 
                        font-medium 
                        text-slate-700 
                        md:text-3xl
                        "
                >
                    Payment Method
                </h1>

                <form onSubmit={savePaymentMethodHandler}>
                    <div className="flex flex-col justify-start gap-2 text-slate-700 text-lg">

                        <div className="flex items-center justify-start gap-2">

                            <FaCcPaypal color='#3b7bbf' size={40} />
                            <label htmlFor="paypal">PayPal</label>
                            <input
                                className="cursor-pointer"
                                id="paypal"
                                name="paymentMethod"
                                value="PayPal"
                                type="radio"
                                checked={paymentMethod === "PayPal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-start gap-2">
                            <FaCcStripe color='#5433FF' size={40} />
                            <label htmlFor="stripe">Stripe</label>
                            <input
                                className="cursor-pointer"
                                id="stripe"
                                name="paymentMethod"
                                value="Stripe"
                                type="radio"
                                checked={paymentMethod === "Stripe"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="w-[25%] mt-3">
                        <Button
                            type="submit"
                            buttonText="Continue"
                        />
                    </div>
                    
                </form>
            </Container>
        </div>
    )
}

export default PaymentScreen