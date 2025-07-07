import React from 'react'
import ProfileFieldCard from '../../../component/ProfileFieldCard'
import { Divider } from '@mui/material'
import { useAppSelector } from '../../../State/Store';

const UserDetails = () => {

  const { user } = useAppSelector((store) => store);

  return (
    <div className='flex justify-center py-10'>
        <div className='w-full lg:w-[70%]'>
            <div className="flex items-center pb-3 justify-between">
                <h1 className="text-2xl font-bold text-[#213D72]">Profile Details</h1>
            </div>
            <div className="space-y-5">
                <ProfileFieldCard keys="Name" value={user.user?.fullName || ''} />
                <Divider />
                <ProfileFieldCard keys="E-mail" value={user.user?.email || ''} />
            </div>
        </div>
    </div>
  )
}

export default UserDetails