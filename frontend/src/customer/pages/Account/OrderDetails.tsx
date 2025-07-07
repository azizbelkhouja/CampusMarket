import { Box, Button, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { OrderStepper } from './OrderStepper';
import { Payments } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { cancelOrder, fetchOrderById, fetchOrderItemById } from '../../../State/customer/OrderSlice';

const OrderDetails = () => {

    const dispatch = useAppDispatch();
    const { auth, orders } = useAppSelector(store => store);
    const { orderItemId, orderId } = useParams();

    useEffect(() => {
        dispatch(fetchOrderItemById({
          orderItemId: Number(orderItemId),
          jwt: localStorage.getItem("jwt") || ""
        }))
        dispatch(fetchOrderById({
          orderId: Number(orderId),
          jwt: localStorage.getItem("jwt") || ""
        }))
    }, [auth.jwt, dispatch, orderId, orderItemId])
    
    if (!orders.orders || !orders.orderItem) {
    return <div className='h-[80vh] flex justify-center items-center'>
        No Order Found
    </div>
    };

    const handleCancelOrder = () => {
        dispatch(cancelOrder(orderId))
    };

    return (
        <Box className='space-y-5'>
            <section className='flex flex-col gap-5 justify-center items-center'>
                <img className='w-[100px]' src={orders.orderItem?.product.images[0]} alt="" />
                <div className='text-sm space-y-1 text-center'>
                <p>{orders.orderItem?.product.title}</p>
                <p><strong>Size: </strong>STANDARD</p>
                </div>
            </section>

            <section className='border p-5'>
                <OrderStepper orderStatus={orders.currentOrder?.orderStatus} />
            </section>

            <div className='border p-5'>
                <h1 className='font-bold pb-3'>Delivery Address</h1>
                <div className='text-sm space-y-2'>
                    <div className='flex gap-5 font-medium'>
                    <p>{orders.currentOrder?.shippingAddress.name}</p>
                    <Divider flexItem orientation='vertical' />
                    <p>{orders.currentOrder?.shippingAddress.mobile}</p>
                    </div>
                    <p>
                        {orders.currentOrder?.shippingAddress.address}, {orders.currentOrder?.shippingAddress.city}, 
                        {orders.currentOrder?.shippingAddress.state} - {orders.currentOrder?.shippingAddress.pinCode}
                    </p>
                </div>
            </div>
            <div className="border space-y-4">

                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>Total Price</p>
                        <p>You saved <span className='my-light-blue font-bold text-xs'>{orders.orderItem?.mrpPrice - orders.orderItem?.sellingPrice}.00€</span> on your order</p>
                    </div>

                    <p className='font-medium'>€{orders.orderItem?.sellingPrice}.00</p>
                </div>

                <div className='px-5'>
                    <div className='bg-[#e5f6fa] px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <Payments />
                        <p>Pay On Delivery</p>
                    </div>
                </div>

                <Divider />

                <div className='p-10'>
                <Button
                    disabled={orders.currentOrder?.orderStatus==="CANCELLED"}
                    color="error"
                    onClick={handleCancelOrder}
                    sx={{
                        py: "0.7rem",
                        borderRadius: 0,
                        "&:hover": {
                            backgroundColor: "red",
                            color: "white",
                        },
                    }}
                    variant="outlined"
                    fullWidth
                >
                    {orders.currentOrder?.orderStatus==="CANCELLED"?"Order Cancelled":"Cancel Order"}
                </Button>
                </div>
            </div>
        </Box>
    )
}

export default OrderDetails