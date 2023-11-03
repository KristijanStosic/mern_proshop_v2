import CheckoutSteps from "../components/CheckoutSteps"
import Container from "../components/Container"
import GoBackButton from "../components/GoBackButton"

const PlaceOrderScreen = () => {
    return (
        <div className="p-8">
            <div className="w-[100px]">
                <GoBackButton />
            </div>
            <Container>
                <CheckoutSteps step1 step2 step3 />
            </Container>
        </div>
    )
}

export default PlaceOrderScreen