import React from 'react'
import "./ShopByCategory.css"
import { useNavigate } from 'react-router-dom';

const ShopByCategoryCard = ({item}:any) => {

  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='custom-border flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='w-[120px] h-[250px] rounded-full lg:w-[220px] lg:h[400px]'>
        <img className='object-cover object-top h-full w-full' src={item.image} alt={item.name} />
      </div>
      <h1>{item.name}</h1>
    </div>
  )
}

export default ShopByCategoryCard