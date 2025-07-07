import React from 'react'
import { useNavigate } from 'react-router-dom';

const ElectronicsCategoryCard = ({item}:any) => {

  const navigate=useNavigate();

  return (
    <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='flex items-center justify-center flex-col gap-2 border-[#213D72] border cursor-pointer p-3 hover:shadow-md transition-all duration-300 ease-in-out'>
      <img className='object-contain h-10' src={item.image} alt={item.name} />
      <h2 className='font-semibold text-sm my-dark-blue'>{item.name}</h2>
    </div>
  )
}

export default ElectronicsCategoryCard