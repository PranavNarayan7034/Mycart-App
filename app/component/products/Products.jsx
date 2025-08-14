'use client'
import React from 'react'
import { productsData } from '@/assets/assets';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from '@/redux/cartSlice';


const Products = () => {
  const dispatch = useDispatch()
  const cartList = useSelector((state) => state.cart.cartList)
  const wishList = useSelector((state) => state.cart.wishList)

  console.log("Cart list in All product page ===", cartList)
  console.log("Wish list in All product page ===", wishList)

  const onAddtoCart = (produtId) => {
    dispatch(addToCart(produtId))
  }

  const onWishList = (produtId) => {
    dispatch(addToWishlist(produtId))
  }

  return (
    <div className='px-16'>
      <h1 className='text-4xl text-center mt-12 mb-8'>Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12'>
        {productsData.map((product) => {

          const isInWishList = wishList.includes(product._id);
          const isInCartList = cartList.includes(product._id);

          return (
            <div key={product._id} className='bg-white/25 px-4 py-2 flex flex-col justify-center gap-3 rounded-3xl shadow'>
              <div className='flex items-center justify-center relative rounded-3xl py-4'>
                <img src={isInWishList ? "/red-heart.png" : "/heart.png"} alt="" className='w-5 absolute top-2 right-4'
                  onClick={() => onWishList(product._id)}
                />
                <img src={product.image} alt="" className='w-48 h-48' />
              </div>
              <p className='bg-black w-fit text-white px-2 rounded-2xl text-sm'>{product.brand}</p>
              <h4 className='font-bold text-lg'>{product.name}</h4>
              <div className='flex gap-8'>
                <p className='font-bold'> ₹ {product.price}</p>
                <p className='text-sm line-through text-black/35'> ₹ {product.offerPrice}</p>
              </div>
              <div className='flex items-center gap-2'>
                <button className='bg-black text-white w-full py-2 rounded-2xl border-2 border-black'>BuyNow</button>
                <button
                  className={`border-2 p-2 rounded-lg ${isInCartList ? "bg-orange-400 border-orange-400" : ""}`}
                  onClick={() => onAddtoCart(product._id)}
                ><img src="/shopping-cart.png" alt="" className='w-5 h-5' /></button>
              </div>
            </div>
          )

        })}
      </div>
    </div>
  )
}

export default Products