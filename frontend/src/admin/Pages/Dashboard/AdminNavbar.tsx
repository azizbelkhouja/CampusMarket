import React from 'react'
import { useAppSelector } from '../../../State/Store'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user } = useAppSelector(store => store)
  const navigate = useNavigate()

  return (
    <div className='h-[10vh] flex items-center justify-between px-5 border-b'>
      <div className='flex items-center gap-3'>
        <h1 className='logo text-xl cursor-pointer'>
          Welcome To The {user.user?.role === 'ROLE_SELLER' ? 'Seller' : 'Admin'} Dashboard, {user.user?.fullName}
        </h1>
      </div>
      
      {user.user?.role === 'ROLE_SELLER' && (
        <Button 
          variant="contained"
          color="primary"
          onClick={() => navigate('/seller')}
          className='my-main-button'
        >
          Seller Portal
        </Button>
      )}
    </div>
  )
}

export default Navbar