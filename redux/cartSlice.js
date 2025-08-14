import { createSlice } from "@reduxjs/toolkit";

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
            const itemExist = state.cartList.some((item) => item == action.payload)
            if (!itemExist) {
                state.cartList.push(action.payload)
            }
            else {
                state.cartList = state.cartList.filter( (item) => item != action.payload)
            }
        },
        addToWishlist(state,action) {
            
            const itemExist = state.wishList.some((item) => item == action.payload)
            if (!itemExist) {
                state.wishList.push(action.payload)
            }
            else {
                state.wishList = state.wishList.filter( (item) => item != action.payload)
            }
        }
    }
})

export const { addToCart,
    addToWishlist,
    setCartList, setWishList } = cartSlice.actions;
export default cartSlice.reducer