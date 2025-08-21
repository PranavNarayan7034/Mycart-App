import axios from "axios"

export const persistMiddleware = store => next => {
    
    setTimeout(async () => {

        const state = store.getState();
        const cartData = {
            cartList: state.cart.cartList,
            wishList: state.cart.wishList,
            userId : state.user.userId
        }
        try {
            await axios.post('/api/cart/updateCart', cartData)
            console.log("Cart Items are updated in mongodb...")
        }
        catch (error) {
            console.log("Cart Sync failed...", error.message)
        }

    }, 3000);

}





