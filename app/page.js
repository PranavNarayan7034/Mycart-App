import React from 'react'

const page = () => {
  return (
    <div className=''>
      <div className='flex px-16 h-auto lg:h-[calc(100vh-200px)] gap-16 my-16 md:my-16'>

        <div className='flex flex-col gap-8 justify-center flex-1'>
          <h1 className='text-4xl font-extrabold text-green-700'>Cozy up in your perfect Chair</h1>
          <p className='flex flex-col gap-4'>
            <span>Style and comfort in one . Discover chairs that blend elegance, durability, and ergonomic support. Perfect for your home, office, or cozy reading nook. Find your ideal design and price today, and sit in comfort every day.</span>
            <span>Don't miss our exclusive offers and discounts</span>
          </p>
          <div className='flex gap-4'>
            <button className='bg-orange-400 border-1 border-orange-400 text-white text-lg px-4 py-2 rounded-xl'>Buy now</button>
            <button className=' border-1 border-orange-400 text-lg px-4 py-2 rounded-xl'>Learn More</button>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <span className='bg-blue-200/50 rounded-full shadow-2xl'>
            <img src="/Productimages/Chair.png" alt="" />
          </span>
        </div>
        <div className='flex-1 hidden md:flex flex-col justify-center gap-4'>
          <div className='bg-orange-100 p-4 rounded-lg w-[70%]'>
            <h3 className='text-lg font-bold'>Comfort</h3>
            <p>Style and Comfort in One</p>
          </div>
          <div className='bg-orange-100 p-4 rounded-lg w-[70%]'>
            <h3 className='text-lg font-bold'>Design</h3>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className='bg-orange-100 p-4 rounded-lg w-[70%]'>
            <h3 className='text-lg font-bold'>Style</h3>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default page