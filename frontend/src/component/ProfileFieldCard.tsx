import { Divider } from '@mui/material'
import React from 'react'

const ProfileFieldCard = ({keys, value}:{keys:string, value:string}) => {
  return (
    <div className='p-5 flex items-center bg-[#e5f6fa]'>
        <p className="w-20 lg:w-36 pr-5">{keys}</p>
        <Divider flexItem orientation='vertical' />
        <p className='pl-4 lg:pl-10 font-semibold text-lg'>{value}</p>
    </div>
  )
}

export default ProfileFieldCard