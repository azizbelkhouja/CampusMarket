import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import { Alert, Button, Snackbar } from '@mui/material';
import SignupForm from './SignupForm';
import { useAppSelector } from '../../../State/Store';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const { auth } = useAppSelector(store => store);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {

        if (auth.otpSent || auth.error) {
            setSnackbarOpen(true);
            console.log("store ", auth.error)
        }

    }, [auth.otpSent,auth.error])

    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className='max-w-md rounded-md border shadow-lg'>
                <img className='w-full rounded-t-md h-50' src="https://i.ibb.co/xK505dxR/banner.png" alt="Banner" />
                <div className=' px-10'>
                    {isLoginPage ? <LoginForm /> : <SignupForm />}

                    <div className='flex items-center justify-center mt-5'>
                        <p>{isLoginPage && "Don't"} have Account ?
                            <Button onClick={() => setIsLoginPage(!isLoginPage)} sx={{color: 'black', fontSize: '11px' }}>{isLoginPage ? "Create Account" : "Login"}</Button>
                        </p>
                        
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen} autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={auth.error?"error":"success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {auth.error?auth.error : " Otp sent to your email!"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Auth