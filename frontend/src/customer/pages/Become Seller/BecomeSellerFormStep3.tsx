import React from 'react';
import { TextField, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// ✅ Validation schema for bankDetails
const BecomeSellerStep3Schema = Yup.object().shape({
  bankDetails: Yup.object().shape({
    accountNumber: Yup.string()
      .required('Account number is required'),
    fiscalCode: Yup.string().required('Fiscal code is required'),
    accountHolderName: Yup.string().required('Account holder name is required'),
  }),
});

const BecomeSellerFormStep3 = () => {
  const initialValues = {
    bankDetails: {
      accountNumber: '',
      fiscalCode: '',
      accountHolderName: '',
    },
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Step 3 Submitted:', values);
    // Proceed to next step or save data
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BecomeSellerStep3Schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Box className="space-y-5 flex flex-col gap-3">
            <TextField
              fullWidth
              label="Account Number"
              name="bankDetails.accountNumber"
              value={formik.values.bankDetails.accountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bankDetails?.accountNumber &&
                Boolean(formik.errors.bankDetails?.accountNumber)
              }
              helperText={
                formik.touched.bankDetails?.accountNumber &&
                formik.errors.bankDetails?.accountNumber
              }
            />

            <TextField
              fullWidth
              label="Fiscal Code"
              name="bankDetails.fiscalCode"
              value={formik.values.bankDetails.fiscalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bankDetails?.fiscalCode &&
                Boolean(formik.errors.bankDetails?.fiscalCode)
              }
              helperText={
                formik.touched.bankDetails?.fiscalCode &&
                formik.errors.bankDetails?.fiscalCode
              }
            />

            <TextField
              fullWidth
              label="Account Holder Name"
              name="bankDetails.accountHolderName"
              value={formik.values.bankDetails.accountHolderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bankDetails?.accountHolderName &&
                Boolean(formik.errors.bankDetails?.accountHolderName)
              }
              helperText={
                formik.touched.bankDetails?.accountHolderName &&
                formik.errors.bankDetails?.accountHolderName
              }
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BecomeSellerFormStep3;
