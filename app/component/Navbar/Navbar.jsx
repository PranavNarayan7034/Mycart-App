'use client'
import React from 'react'
// import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux'

const Navbar = () => {

    // const { data: session, status } = useSession();
    // console.log("Login Status ===",status)

    const { userId, Name, Email } =
        useSelector((state) => state.user)

    return (
        <nav className='flex justify-between items-center
            p-4 px-16'>
            <div className='text-3xl'>MyCart</div>
            <div className='flex gap-6'>
                <a href="/">Home</a>
                <a href="">About</a>
                <a href="/all-products">Products</a>
                <a href="">Contact</a>
            </div>
            {userId
                ?
                <div className='flex gap-5'>
                    <img src="/shopping-cart.png" alt="" className='w-7 h-7' />
                    <img src="user.png" alt="" className='w-7 h-7' />
                </div>
                : <div className='flex gap-4'>
                    <a href='/signin' className='bg-orange-400 px-3 py-1 rounded-xl'>Sign in</a>
                    <a href='/signup' className='bg-orange-400 px-3 py-1 rounded-xl'>Sign up</a>
                </div>
            }
        </nav>
    )
}

export default Navbar