import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center
            p-4'>
            <div className='text-3xl'>MyCart</div>
            <div className='flex gap-6'>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Products</a>
                <a href="">Contact</a>
            </div>
            <div className='flex gap-4'>
                <a href='/signin' className='bg-orange-400 px-3 py-1 rounded-xl'>Sign in</a>
                <a href='/signup' className='bg-orange-400 px-3 py-1 rounded-xl'>Sign up</a>
            </div>
        </nav>
    )
}

export default Navbar