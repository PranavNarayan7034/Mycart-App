'use client'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [Dropdown,setDropdown] = useState(false)
    const { userId, Name, Email } = useSelector((state) => state.user) 
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

                    <div className='relative w-auto'
                        onMouseEnter={ ()=> setDropdown(true)}
                        onMouseLeave={ ()=> setDropdown(false)}
                    >
                        <img src="user.png" alt="" className='w-7 h-7' />
                        {Dropdown &&
                            <div className='absolute left-[-40px] shadow-2xl w-[100px] flex flex-col gap-3
                            py-6'>
                                <button>Account</button>
                                <button>My orders</button>
                                <button
                                    onClick={ ()=> signOut({callbackUrl:"/signin"})}
                                >Logout</button>
                            </div>
                        }
                    </div>
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