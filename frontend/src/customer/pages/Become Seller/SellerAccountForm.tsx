import React, { useState } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createSeller } from '../../../State/seller/sellerAuthenticationSlice';

const steps = [
  'Mobile & Tax Details',
  'Pickup Address',
  'Bank Account',
  'Supplier Information',
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const { sellerAuth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [otp, setOtp] = useState<any>();

  const handleStep = (value: number) => {
    setActiveStep((prev) => prev + value);
  };

  const formik = useFormik({
    initialValues: {
      mobile: '',
      cf: '',
      pickupAddress: {
        name: '',
        mobile: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: '',
      },
      bankDetails: {
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        fiscalCode: '',
      },
      sellerName: '',
      email: '',
      preferredname: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values, 'formik submitted');
      dispatch(createSeller(values));
    },
  });

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    console.log(otpValue);
  };

  const handleSubmit = async () => {
    await formik.handleSubmit();
    console.log('Form Submitted');
    navigate('/login');
  };

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '.MuiStepIcon-root.Mui-active': { color: '#213D72' },
          '.MuiStepIcon-root.Mui-completed': { color: '#213D72' },
          '.MuiStepIcon-text': { fill: 'white' },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-10 space-y-9">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} handleOtpChange={handleOtpChange} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outlined"
            className='my-main-button-outlined'
            disabled={activeStep === 0}
            onClick={() => handleStep(-1)}
            sx={{ textTransform: 'none', fontWeight: 'bold', minWidth: '100px' }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            className='my-main-button'
            disabled={sellerAuth.loading}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit
                : () => handleStep(1)
            }
            sx={{ textTransform: 'none', fontWeight: 'bold', minWidth: '100px' }}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
