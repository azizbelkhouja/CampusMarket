import React from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import { teal } from '@mui/material/colors';

const SavedCards = () => {
  return (
    <div className='flex flex-col justify-center items-center lg:min-h-[60vh] gap-6'>

        <div>
            <AddCardIcon sx={{color:"#213D72", fontSize:"150px"}}/>
        </div>

        <div className='text-center w-full lg:w-[68%] space-y-4'>
            <h1 className='font-bold text-lg text-[#213D72]'>SAVE YOUR CREDIT/DEBIT CARDS FOR FUTURE PAYMENTS
            </h1>
            <p className='text-gray-700'>It's convenient to pay with saved cards. Your card information will be secure.</p>
        </div>

    </div>
  )
}

export default SavedCards