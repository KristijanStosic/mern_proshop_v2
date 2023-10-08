const convertToNumber = (num) => {
    return parseFloat(num).toFixed(2)
}

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const updateCart = (state) => {
    // Calculate items price
    const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    //state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    state.itemsPrice = addDecimals(itemsPrice);

    // Calculate shipping price (if order > $100 then free, else 5$ shipping)
    const shippingPrice = itemsPrice > 100 ? 0 : 5
    //state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 5)
    state.shippingPrice = addDecimals(shippingPrice)

    // Calculate tax price (5% tax)
    const taxPrice = 0.05 * itemsPrice
    //state.taxPrice = addDecimals(Number(0.05 * state.itemsPrice).toFixed(2))
    state.taxPrice = addDecimals(taxPrice)

    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    // Calculate total price
    //state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)
    state.totalPrice = addDecimals(totalPrice)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
}

export { addDecimals, updateCart, convertToNumber }