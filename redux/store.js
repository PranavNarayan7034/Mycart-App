import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import cartReducer from './cartSlice';
// import { persistMiddleware } from "./middleware/persistMiddleware";

export const makeStore = (preloadedState) =>
    configureStore({
        reducer: {
            user: userReducer,
            cart: cartReducer,
        },
        // middleware: (getDefaultMiddleware) => 
        //     getDefaultMiddleware().concat(persistMiddleware)
        // ,
        preloadedState,
    });



    