import React from 'react'
import UserAddressCard from './UserAddressCard'
import { useAppSelector } from '../../../State/Store'

const Address = () => {

  const { user } = useAppSelector(store => store)

  return (
    <>
      <div className='space-y-3'>
        {user.user?.addresses?.map((item, index) =>
              <UserAddressCard
                  key={item.id}
                  item={item} />
        )}
      </div>
    </>
  )
}

export default Address