import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catList: [],
    wishList : [],
}

const cartSlice = createSlice({
    name: "Cart Data",
    initialState,
    reducers: {
        addToCart() {
            
        },
        addToWishlist() {
            
        }
    }
})

export const { addToCart, addToWishlist } = cartSlice.actions;
export default cartSlice.reducer