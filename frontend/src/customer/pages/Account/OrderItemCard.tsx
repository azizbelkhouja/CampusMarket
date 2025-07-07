import { ElectricBolt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Order, OrderItem } from '../../../types/orderTypes'
import { formatDate } from '../../util/formatDate'

interface OrderItemCardProps {
  item : OrderItem,
  order : Order
}

const OrderItemCard:React.FC<OrderItemCardProps> = ({item, order}) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)} className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>
      <div className="flex items-center gap-5">
        <div className="">
          <Avatar sizes='small' sx={{bgcolor: '#00B1D3'}}>
            <ElectricBolt/>
          </Avatar>
        </div>
        <div className="">
          <h1 className="font-bold">{order.orderStatus}</h1>
          <p className="">Arriving By {formatDate(order.deliverDate)}</p>
        </div>
      </div>

      <div className="p-5 flex bg-[#e5f6fa] gap-3 rounded-md">
        <div className="">
          <img className='w-[70px]' src={item.product.images[0]} alt="" />
        </div>
        <div className="w-full space-y-2">
          <h1 className='font-bold'>{item.product.title}</h1>
          <p className="">{item.product.title}</p>
          <p className=""><strong>Size: </strong> {item.size}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderItemCard