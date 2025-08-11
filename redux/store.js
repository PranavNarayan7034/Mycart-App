import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';

export const makeStore = (preloadedState) =>
    configureStore({
        reducer: {
            user: userReducer
        },
        preloadedState,
    });
