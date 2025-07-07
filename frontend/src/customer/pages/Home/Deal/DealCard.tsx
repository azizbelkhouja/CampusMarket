import React from 'react'
import { useNavigate } from 'react-router-dom';
import type { Deal } from '../../../../types/dealTypes';

const DealCard = ({deal}:{deal:Deal}) => {

  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/products/${deal.category.categoryId}`)} className='w-[12rem] cursor-pointer'>
        <img className='border-x-[7px] border-t-[7px] w-full h-[12rem] object-cover object-top border-black  p-2' src={deal.category.image} alt="office chair" />
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
          <p className='text-lg font-semibold'>{deal.category.categoryId.split("_").join(" ")}</p>
          <p className='text-2xl font-bold'>{deal.discount}% OFF</p>
          <p className='text-balance text-lg bg-white text-black mt-2 font-medium'>Shop Now</p>
        </div>
    </div>
  )
}

export default DealCard