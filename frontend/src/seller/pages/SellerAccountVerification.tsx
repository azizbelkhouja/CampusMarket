import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../State/Store';
import { verifySellerEmail } from '../../State/seller/sellerSlice';

const SellerAccountVerification = () => {
  const { otp } = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifySellerEmail({ otp: Number(otp), navigate }))
  }, [otp])


  return (
    <div>SellerAccountVerification</div>
  )
}

export default SellerAccountVerification