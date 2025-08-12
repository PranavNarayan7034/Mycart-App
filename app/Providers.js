'use client'
import React, { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import Navbar from './component/Navbar/Navbar';
import { makeStore } from '@/redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';


const Providers = ({ children, initialUser }) => {

    const store = makeStore({
        user: {
            userId: initialUser.userId,
            Name: initialUser.Name,
            Email: initialUser.Email
        }
    })

    useEffect(() => {
        const updateCart = async () => {
            try {
                await axios.post('/api/cart/Datafetch', initialUser)
                console.log("Redux Cart updated on initial Rendering")
            } catch (error) {
                console.log("Error in api call ==", error.message)
            }
        }
        updateCart()
    } ,[])

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