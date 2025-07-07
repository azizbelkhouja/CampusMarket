import React from 'react';
import { TextField, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// ✅ Validation schema
const BecomeSellerStep4Schema = Yup.object().shape({
  preferredname: Yup.string()
    .required('Display name is required')
    .min(2, 'Too short'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const BecomeSellerFormStep4 = () => {
  const initialValues = {
    preferredname: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Step 4 Submitted:', values);
    // Perform final registration or next step
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BecomeSellerStep4Schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Box className="space-y-5 flex flex-col gap-3">
            <TextField
              fullWidth
              name="preferredname"
              label="Display Name"
              value={formik.values.preferredname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.preferredname && Boolean(formik.errors.preferredname)}
              helperText={formik.touched.preferredname && formik.errors.preferredname}
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BecomeSellerFormStep4;
