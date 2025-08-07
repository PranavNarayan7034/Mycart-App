'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Signup = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        Password:""
    })

    const onSignup = async () => {
        try {
            await axios.post('/api/auth/signup', userData)
            toast.success("Signup Completed")
            router.push('/signin')
        } catch (error) {
            toast.success("Signup Completed")
        }
    }

    
    return (
        <div className='flex flex-col items-center justify-center h-[75vh] lg:px-32 px-16 gap-16'>
            <h1 className='text-4xl font-bold uppercase text-center'>Signup</h1>
            <div className='flex gap-16'>
                <div className='flex xl:flex-1/3 lg:flex-2/3 flex-3/3 flex-col items-start gap-4'>
                    <h2 className='text-xl font-medium'>Signup</h2>
                    <input type="text" placeholder='First Name' className='border-1 p-2 rounded-md w-full'
                        value={userData.Firstname}
                        onChange={(e)=> setUserData({...userData,Firstname:e.target.value})}
                    />
                    <input type="text" placeholder='Last Name' className='border-1 p-2 rounded-md w-full'
                        value={userData.Lastname}
                        onChange={(e)=> setUserData({...userData,Lastname:e.target.value})}
                    />
                    <input type="Email" placeholder='Email' className='border-1 p-2 rounded-md w-full'
                        value={userData.Email}
                        onChange={(e)=> setUserData({...userData,Email:e.target.value})}
                    />
                    <input type="password" placeholder='Password' className='border-1 p-2 rounded-md w-full'
                        value={userData.Password}
                        onChange={(e)=> setUserData({...userData,Password:e.target.value})}
                    />
                    <button className='bg-black text-white font-medium px-8 py-2'
                        onClick={onSignup}
                    >
                        Signup
                    </button>
                </div>
                <div className='flex flex-col gap-4 items-start'>
                    <h2 className='text-xl font-medium'>Already Customer</h2>
                    <p>Sign in for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails</p>
                    <a href='/signin' className='bg-black text-white font-medium px-8 py-2'>Login</a>
                </div>
            </div>
        </div>
    )
}

export default Signup