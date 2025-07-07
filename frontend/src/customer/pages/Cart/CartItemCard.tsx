import { Add, Close, Remove } from '@mui/icons-material'
import { Button, Divider, IconButton } from '@mui/material'
import React from 'react'
import type { CartItem } from '../../../types/cartTypes'
import { useAppDispatch } from '../../../State/Store'
import { deleteCartItem, updateCartItem } from '../../../State/customer/CartSlice'

interface CartItemProps {
  item:CartItem
}

const CartItemCard : React.FC<CartItemProps> = ({ item }) => {

  const dispatch = useAppDispatch();
    
  const handleUpdateQuantity=(value:number)=>{
      dispatch(updateCartItem({jwt:localStorage.getItem("jwt"),
          cartItemId:item.id, cartItem:{quantity:item.quantity + value}}))
  }
  const handleRemoveCartItem=()=>{
      dispatch(deleteCartItem({
          jwt:localStorage.getItem("jwt") || "", 
          cartItemId:item.id}))
  }

  return (
    <div className='border rounded-md relative'>
      
      <div className="p-5 flex gap-3">

        <div>
          <img className='w-[90px] rounded-md' src={item.product.images[0]} alt="" />
        </div>

        <div className='space-y-2'>
        <h1 className="font-semibold text-lg">{item.product?.title}</h1>
        <p className='text-gray-600 font-medium text-sm'>
          {item.product.description}
        </p>
        <p className='text-xs text-gray-400'><strong>Sold By: </strong>{item.product?.seller?.sellerName}</p>
        <p className='text-sm'>3 days return available</p>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          PRICE : 
        </div>
        <div className="pr-5">
        <p className='font-medium text-gray-700 '>{item.sellingPrice} €</p>
        </div>

      </div>

      <div className='absolute top-1 right-1'>
        <IconButton onClick={handleRemoveCartItem}>
          <Close/>
        </IconButton>
      </div>

    </div>
  )
}

export default CartItemCard