import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BecomeSeller = () => {

    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleShowPage = () => {
        if (!isLogin) {
            navigate('/login');
        } else {
            setIsLogin(true);
        }
    };

  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
        <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 border-r-2 border-gray-200">
            { !isLogin ? <SellerAccountForm /> : <SellerLoginForm /> }

            <div className="mt-10 space-y-2">
                <h1 className="text-center text-sm font-medium">{ isLogin ? "Don't Have An Account ?" : "Already Have An Account ?" }</h1>
                <Button fullWidth onClick={handleShowPage} className='my-main-button-outlined' >
                    { isLogin ? "Create Account" : "Login" }
                </Button>
            </div>
        </section>
        <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>
            <div className="lg:w-[70%] px-5 space-y-5">
                <div className="space-y-2 font-bold text-center">
                    <p className="text-2xl">Join Us !</p>
                    <p className="text-lg text-gray-400">Start Flipping Today</p>
                </div>
                <img src="/banner.png" alt="" />
            </div>
        </section>
    </div>
  )
}

export default BecomeSeller