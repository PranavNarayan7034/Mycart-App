'use client'
import React from 'react'
import { useState } from 'react'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const Signin = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const onSignin = async (e) => {
        try {
            e.preventDefault()
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })
            if (res?.ok) {
                toast.success("Login SuccessFull")
                window.location.reload();
            }
            else if(res.error){
                setError(res.error)
            }
            else {
                toast.error("Login Failed")
            }
        } catch (error) {
            console.log("Error in Login", error.message)
        }
    }

    const handleprovider = (event, value) => {
        event.preventDefault()
        signIn(value, { callbackUrl: "/" })
    }

    return (
        <div className='flex flex-col items-center justify-center h-[75vh] px-32 gap-16'>
            <h1 className='text-4xl font-bold uppercase text-center'>Login</h1>
            <div className='flex gap-32'>
                <div className='flex xl:flex-1/3 lg:flex-2/3 flex-3/3 flex-col items-start gap-4'>
                    <h2 className='text-xl font-medium'>Login</h2>
                    <input type="text" placeholder='Email' className='border-1 p-2 rounded-md w-full'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder='Password' className='border-1 p-2 rounded-md w-full'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-black text-white font-medium px-8 py-2'
                        onClick={onSignin}
                    >
                        Login
                    </button>


                    <button className='flex items-center px-4 py-1 gap-4 border-1 border-black/30 rounded-2xl'
                        onClick={(e) => handleprovider(e, "github")}
                    >
                        <img src="/github-sign.png" alt="" className='w-5 h-5' />
                        <p>Signin Using GitHub</p>
                    </button>
                    <button className='flex items-center px-4 py-1 gap-4 border-1 border-black/30 rounded-2xl'
                        onClick={(e) => handleprovider(e, "google")}
                    >
                        <img src="/google.png" alt="" className='w-5 h-5' />
                        <p>Signin Using Google</p>
                    </button>



                </div>
                <div className='flex flex-col gap-4 items-start'>
                    <h2 className='text-xl font-medium'>New Customer</h2>
                    <p>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails</p>
                    <a href='/signup' className='bg-black text-white font-medium px-8 py-2'>Register</a>
                </div>
            </div>
        </div>
    )
}

export default Signin