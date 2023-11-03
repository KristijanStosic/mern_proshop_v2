import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../slices/cartSlice"
import { FaArrowCircleLeft } from "react-icons/fa"
import Container from "../components/Container"
import Button from "../components/Button"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = () => {
    const { shippingAddress } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const [firstName, setFirstName] = useState(shippingAddress?.firstName || user?.firstName || '')
    const [lastName, setLastName] = useState(shippingAddress?.lastName || user?.lastName || '')
    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')
    const [note, setNote] = useState(shippingAddress?.note || '')
    const [email, setEmail] = useState(user?.email || '')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const saveShippingAddressHandler = (e) => {
        e.preventDefault()
        const shippingAddressData = { firstName, lastName, address, city, postalCode, country, note, email }
        dispatch(saveShippingAddress(shippingAddressData))
        navigate('/payment')
    }

    return (
        <div className="p-8">
            <div className="w-[100px]">
                <Button
                    onClick={() => navigate('/cart')}
                    buttonText='Go Back!'
                    small
                    outline
                    icon={<FaArrowCircleLeft size={16} />}
                />
            </div>
            <Container>
                    <CheckoutSteps step1 />

                    <div className="flex flex-col w-full px-0 mx-auto md:flex-row border border-slate-300 rounded">

                        <div className="flex flex-col md:w-full px-5 py-3">

                            <h1 className="
                                mb-4 
                                font-medium 
                              text-slate-700 
                                md:text-3xl
                                "
                            >
                                Shipping Address
                            </h1>

                            <form 
                                className="justify-center w-full mx-auto" 
                                onSubmit={saveShippingAddressHandler}
                            >
                                    <div className="space-x-0 lg:flex lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                            <label
                                                htmlFor="firstName"
                                                className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                                "
                                            >
                                                First Name
                                            </label>
                                            <input
                                                onChange={(e) => setFirstName(e.target.value)}
                                                value={firstName}
                                                name="firstName"
                                                type="text"
                                                required
                                                placeholder="First Name"
                                                className="w-full px-4 py-3 text-sm border border-slate-300 rounded lg:text-sm focus:outline-none
                                                focus:ring-1 focus:ring-slate-700
                                                "
                                            />
                                        </div>

                                        <div className="w-full lg:w-1/2 ">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-3 
                                                text-sm 
                                                font-semibold 
                                              text-slate-700
                                                "
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={lastName}
                                                name="lastName"
                                                type="text"
                                                placeholder="Last Name"
                                                required
                                                className="w-full px-4 py-3 text-sm border border-slate-300 rounded 
                                                lg:text-sm focus:outline-none
                                                focus:ring-1 focus:ring-slate-700
                                                "
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label
                                                htmlFor="email"
                                                className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                                "
                                            >
                                                Email
                                            </label>
                                            <input
                                                disabled
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                name="email"
                                                type="text"
                                                placeholder="Email"
                                                required
                                                className="
                                                w-full 
                                                px-4 
                                                py-3 
                                                text-sm 
                                                border 
                                                border-slate-300 
                                                rounded 
                                                lg:text-sm 
                                                focus:outline-none 
                                                focus:ring-1 
                                                focus:ring-slate-700
                                                disabled:cursor-not-allowed
                                                disabled:opacity-80
                                                "
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label
                                                htmlFor="address"
                                                className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                                "
                                            >
                                                Address
                                            </label>
                                            <textarea
                                                onChange={(e) => setAddress(e.target.value)}
                                                value={address}
                                                name="Address"
                                                cols="20"
                                                rows="2"
                                                placeholder="Address"
                                                required
                                                className="
                                                w-full 
                                                px-4 
                                                py-3 
                                                text-xs
                                                border 
                                                border-slate-300 
                                                rounded 
                                                lg:text-sm 
                                                focus:outline-none 
                                                focus:ring-1 
                                                focus:ring-slate-700
                                                "
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
                                        <div className="w-full lg:w-1/2">
                                            <label
                                                htmlFor="city"
                                                className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                                "
                                            >
                                                City
                                            </label>
                                            <input
                                                onChange={(e) => setCity(e.target.value)}
                                                value={city}
                                                name="city"
                                                type="text"
                                                placeholder="City"
                                                required
                                                className="
                                                w-full 
                                                px-4 
                                                py-3 
                                                text-sm 
                                                border 
                                                border-slate-300 
                                                rounded lg:text-sm 
                                                focus:outline-none 
                                                focus:ring-1 
                                                focus:ring-slate-700
                                            "
                                            />
                                        </div>
                                        <div className="w-full lg:w-1/2">
                                            <label
                                                htmlFor="postalCode"
                                                className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                                "
                                            >
                                                Postal Code
                                            </label>
                                            <input
                                                onChange={(e) => setPostalCode(e.target.value)}
                                                value={postalCode}
                                                name="postalCode"
                                                type="text"
                                                placeholder="Postal Code"
                                                className="
                                                w-full 
                                                px-4 
                                                py-3 
                                                text-sm border 
                                                border-slate-300 
                                                rounded 
                                                lg:text-sm 
                                                focus:outline-none 
                                                focus:ring-1 
                                                focus:ring-slate-700
                                                " 
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label
                                                htmlFor="country"
                                                className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                                "
                                            >
                                                Country
                                            </label>
                                            <input
                                                onChange={(e) => setCountry(e.target.value)}
                                                value={country}
                                                name="country"
                                                type="text"
                                                placeholder="Country"
                                                className="
                                                w-full 
                                                px-4 
                                                py-3 
                                                text-sm border 
                                                border-slate-300 
                                                rounded 
                                                lg:text-sm 
                                                focus:outline-none 
                                                focus:ring-1 
                                                focus:ring-slate-700
                                                " 
                                            />
                                        </div>
                                    </div>

                                    <div className="relative pt-3 xl:pt-6">
                                        <label 
                                            htmlFor="note"
                                            className="
                                                block 
                                                mb-3 
                                                text-sm 
                                                font-semibold 
                                                text-slate-700
                                            "
                                        > 
                                                Notes (Optional)
                                        </label>
                                        <textarea 
                                            onChange={(e) => setNote(e.target.value)}
                                            value={note}
                                            name="note"
                                            className="
                                                flex 
                                                items-center 
                                                w-full 
                                                px-4 
                                                py-3 
                                                text-sm 
                                                border 
                                                border-slate-300 
                                                rounded 
                                                focus:outline-none 
                                                focus:ring-1 
                                                focus:ring-slate-700
                                            "
                                                rows="4" 
                                                placeholder="Notes for delivery"
                                        >
                                        </textarea>
                                    </div>

                                    <div className="mt-4">
                                        <Button
                                            buttonText='Continue'
                                            type='submit'
                                        />
                                    </div>
                            </form>

                        </div>

                    </div>
            </Container>
        </div>
    )
}

export default ShippingScreen