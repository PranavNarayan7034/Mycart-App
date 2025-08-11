'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import Navbar from './component/Navbar/Navbar';
import { makeStore } from '@/redux/store';
import { Provider } from 'react-redux';


const Providers = ({ children, initialUser }) => {

    const store = makeStore({
        user: {
            userId: initialUser.userId,
            Name: initialUser.Name,
            Email: initialUser.Email
        }
    })

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