import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-3 lg:px-20'>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-fill object-top' src="https://images.pexels.com/photos/7171398/pexels-photo-7171398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-fill object-top' src="https://images.pexels.com/photos/6958645/pexels-photo-6958645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-fill object-top' src="https://images.pexels.com/photos/7034047/pexels-photo-7034047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-fill object-top' src="https://images.pexels.com/photos/15522603/pexels-photo-15522603/free-photo-of-blonde-woman-posing-with-backpack.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-fill object-top' src="https://images.pexels.com/photos/7964034/pexels-photo-7964034.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-fill object-top' src="https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
    </div>
  )
}

export default CategoryGrid