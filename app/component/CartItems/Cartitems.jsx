'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { productsData } from '@/assets/assets'
const Cartitems = () => {
    const cartList = useSelector((state) => state.cart.cartList || [])
    // console.log("Products in my cartlist ===",cartList)
    const cartProducts = productsData.filter(product =>
        cartList.includes(product._id)
    );
    const totalActualPrice = cartProducts.reduce((initial,product)=> initial + product.price , 0)
    const totalOfferPrice = cartProducts.reduce((initial,product)=> initial + product.offerPrice , 0)
    return (
        <div className='px-16 py-8'>
            <h1 className='my-8 text-center font-bold text-3xl'>MyCart</h1>
            {cartProducts.length > 0 ? (
                <table className='table-auto w-full overflow-hidden border
                 border-black rounded-lg'>
                    <thead>
                        <tr className='text-left'>
                            <th className='px-4 py-2'>Image</th>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Quantity</th>
                            <th className='px-4 py-2'>Actual Price</th>
                            <th className='px-4 py-2'>OfferPrice</th>
                            <th className='px-4 py-2'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProducts.map(product => (
                            <tr key={product._id} className='border'>
                                <td className='px-4 py-2'>
                                    <img src={product.image} alt=""
                                        className='w-16 h-16 object-contain' />
                                </td>
                                <td className='px-4 py-2'>{product.name}</td>
                                <td className='px-4 py-2'>1</td>
                                <td className='px-4 py-2'>{product.price}</td>
                                <td className='px-4 py-2'>{product.offerPrice}</td>
                                <td className='px-4 py-2'>{product.offerPrice}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className='px-4 py-2' colSpan="3">total</td>
                            <td className='px-4 py-2' colSpan='2'>{totalActualPrice}</td>
                            <td className='px-4 py-2'>{totalOfferPrice}</td>
                        </tr>
                    </tbody>
                </table>
            ): (
                <p>Your Cart is Empty</p>
            )}
        </div>
    )
}

export default Cartitems