import { createSlice } from "@reduxjs/toolkit"
import { updateCart, addDecimals } from "../utils/cartUtils"

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((x) => x._id === item._id)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                )
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            // Calculate items price
            /*state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            // Calculate shipping price (if order > $100 then free, else 5$ shipping)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 5)

            // Calculate tax price (5% tax)
            state.taxPrice = addDecimals(Number(0.05 * state.itemsPrice).toFixed(2))

            // Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)

            localStorage.setItem('cart', JSON.stringify(state))*/

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload) // action.payload is ID passed in

            /*
            // Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            // Calculate shipping price (if order > $100 then free, else 5$ shipping)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 5)

            // Calculate tax price (5% tax)
            state.taxPrice = addDecimals(Number(0.05 * state.itemsPrice).toFixed(2))

            // Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)

            localStorage.setItem('cart', JSON.stringify(state))
           
            return state
             */
            return updateCart(state)
        },
        clearCartItems: (state) => {
            state.cartItems = []
            state.itemsPrice = 0
            state.shippingPrice = 0
            state.taxPrice = 0
            state.totalPrice = 0
            localStorage.setItem('cart', JSON.stringify(state))
            return state
            //return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            return updateCart(state)
        },
        resetCart: (state) => {
            state.cartItems = []
            state.shippingAddress = {}
            state.itemsPrice = 0
            state.shippingPrice = 0
            state.taxPrice = 0
            state.totalPrice = 0
            localStorage.setItem('cart', JSON.stringify(state))
            return state
        },
    }
})

export const {
    addToCart,
    removeFromCart,
    clearCartItems,
    saveShippingAddress,
    resetCart
} = cartSlice.actions

export default cartSlice.reducer