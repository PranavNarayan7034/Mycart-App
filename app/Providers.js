'use client'
import React, { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import Navbar from './component/Navbar/Navbar';
import { makeStore } from '@/redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { setCartList, setWishList } from '@/redux/cartSlice';

const Providers = ({ children, initialUser }) => {

    const store = makeStore({
        user: {
            userId: initialUser.userId,
            Name: initialUser.Name,
            Email: initialUser.Email
        }
    })

    const pathname = usePathname()
    useEffect(() => {
        if (pathname == "/Mycart" || pathname=='/all-products') {
            const updateCart = async () => {
                try {
                    const response = await axios.post('/api/cart/Datafetch',initialUser)
                    // console.log("response ==",response.data.cart)
                    store.dispatch(setCartList(response.data.cart))
                    store.dispatch(setWishList(response.data.wishlist))
                    console.log("Cart and Wishlist Updated..")
                } catch (error) {
                    console.log("Error in api call ==", error.message)
                }
            }
            updateCart()
        }
    }, [])

    return (
        <Provider store={store}>
            <SessionProvider>
                <Navbar />
                {children}
            </SessionProvider>
        </Provider>
    )
}

export default Providers;