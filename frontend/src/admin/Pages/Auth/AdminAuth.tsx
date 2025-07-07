import React from 'react'
import AdminLoginForm from './AdminLogin'

const AdminAuth = () => {
  return (
    <div className='flex justify-center items-center h-[65.8vh]'>
        <div className='max-w-4xl border rounded-md px-5 py-20'>
            <AdminLoginForm />
        </div>
    </div>
  )
}

export default AdminAuth