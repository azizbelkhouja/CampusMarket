import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm';
import PricingCard from '../Cart/PricingCard';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createOrder } from '../../../State/customer/OrderSlice';
import UserAddressCard from '../Account/UserAddressCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const paymentGatewayList = [
    {
        value:"PAYPAL",
        image:"https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15.fit_lim.size_1050x591.v1602794215.png",
        label:""
    },
    {
        value:"STRIPE",
        image:"https://vikwp.com/images/plugins/stripe.png",
        label:""
    }
]
    
const Checkout = () => {

    const [value, setValue] = React.useState(0);
    const [paymentGateway, setPaymentGateway] = useState(paymentGatewayList[0].value);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store);

    const handleChange = (event: any) => {
        console.log("-----", event.target.value)
        setValue(event.target.value);
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentGateway((event.target as HTMLInputElement).value);
    };

    const handleCreateOrder = () => {
        if (user.user?.addresses)
            dispatch(createOrder({
                paymentGateway,
                address: user.user?.addresses[value],
                jwt: localStorage.getItem('jwt') || ""
            }))
    }

  return (
    <>
        <div className='pt-30 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
            <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
                <div className="col-span-2 space-y-5">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold">Select Shipping Address</h1>
                        <Button sx={{ color: 'black', border: 'black solid 1px' }} onClick={handleOpen}>Add New Address</Button>
                    </div>
                    <div className="text-xs font-medium space-y-5">
                        <p>Saved Addresses</p>
                        <div className="space-y-3">
                        {user.user?.addresses?.map((item, index) =>
                            <UserAddressCard key={item.id} item={item} />
                        )}
                        </div>
                    </div>
                    <div>
                        <Button fullWidth sx={{ color: 'black', border: 'black solid 1px' }} onClick={handleOpen}>Add New Address</Button>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="space-y-3 border p-5 mb-2 rounded-md">
                            <h1 className='text-black font-medium pb-2 text-center'>Payment Method</h1>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" className='flex justify-between'
                                onChange={handlePaymentChange}
                                value={paymentGateway}>
                                {
                                    paymentGatewayList.map((item) => <FormControlLabel className='border w-[45%] pr-2 rounded-md flex justify-center' value={item.value} control={<Radio sx={{ color: "black", '&.Mui-checked': { color: "black" } }} />} label= {
                                        <img src={item.image} alt={item.label} className={`${item.value=="stripe"?"w-14":""} object-cover`} />
                                    }/>) 
                                }
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='border rounded-md'>
                        <PricingCard />
                        <div className="p-5">
                            <Button onClick={handleCreateOrder} fullWidth className='my-main-button-outlined'>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <AddressForm paymentGateway={paymentGateway} handleClose={handleClose} />
        </Box>
        </Modal>
    </>


  )
}

export default Checkout