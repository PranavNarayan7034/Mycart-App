import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartList: [],
    wishList : [],
}

const cartSlice = createSlice({
    name: "Cart Data",
    initialState,
    reducers: {
        setCartList(state,action) {
            state.cartList = action.payload;
        },
        setWishList(state,action) {
            state.wishList = action.payload;
        },

        addToCart(state, action) {
            // const itemExist = state.cartList.some((item) => item == action.payload)
            // if (!itemExist) {
            //     state.cartList.push(action.payload)
            // }
            // else {
            //     state.cartList = state.cartList.filter( (item) => item != action.payload)
            // }

            if (!state.cartList.includes(action.payload)) {
                state.cartList.push(action.payload)
            }
        },
        addToWishlist(state,action) {
            
            // const itemExist = state.wishList.some((item) => item == action.payload)
            // if (!itemExist) {
            //     state.wishList.push(action.payload)
            // }
            // else {
            //     state.wishList = state.wishList.filter( (item) => item != action.payload)
            // }

            if (!state.wishList.includes(action.payload)) {
                state.wishList.push(action.payload)
            }
        }
    }
})

export const { addToCart, addToWishlist, setCartList, setWishList } = cartSlice.actions;

export const addtoCartAsync = (productId) => async(dispatch,getState) => {
    const user = getState().user;
    try {
        dispatch(addToCart(productId))
        await axios.post('/api/cart/addtocart', { user, productId })
        console.log("Cart items updated in Redux and Mongodb")
    } catch (error) {
        console.log("Error in cart updation on Redux and Mongodb")
    }
}

export const addtoWishlistAsync = (productId) =>  async(dispatch,getState) =>{
    const user = getState().user;
    try {
        dispatch(addToWishlist(productId))
        await axios.post('/api/cart/addtowishlist', { user, productId })
        console.log("wishlist items updated in Redux and Mongodb")
    } catch (error) {
        console.log("Error in wishlist updation on Redux and Mongodb")
    }
}


export default cartSlice.reducer;