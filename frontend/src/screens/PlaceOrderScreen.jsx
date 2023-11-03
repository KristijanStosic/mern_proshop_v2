import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import Container from "../components/Container"
import GoBackButton from "../components/GoBackButton"

const PlaceOrderScreen = () => {
    const { paymentMethod, shippingAddress } = useSelector((state) => state.cart)

    const navigate = useNavigate()

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        } else if (!paymentMethod) {
            navigate('/payment')
        }
    }, [shippingAddress.address, paymentMethod, navigate])

    return (
        <div className="p-8">
            <div className="w-[100px]">
                <GoBackButton />
            </div>
            <Container>
                <CheckoutSteps step1 step2 step3 selectedStep='place-order' />
                <h1>place order screen</h1>
            </Container>
        </div>
    )
}

export default PlaceOrderScreen