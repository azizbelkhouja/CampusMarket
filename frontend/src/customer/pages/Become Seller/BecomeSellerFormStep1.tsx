import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// ✅ Validation Schema using Yup
const BecomeSellerStep1Schema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile must be exactly 10 digits'),
  cf: Yup.string()
    .required('Fiscal Code is required')
    .matches(/^[A-Z0-9]{16}$/, 'Fiscal Code must be 16 alphanumeric characters'),
});

const BecomeSellerFormStep1 = () => {
  const initialValues = {
    mobile: '',
    cf: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form Submitted:', values);
    // Proceed to next step or API call
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BecomeSellerStep1Schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Box>
            <div className="flex flex-col gap-5">
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />

              <TextField
                fullWidth
                label="Fiscal Code"
                name="cf"
                value={formik.values.cf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cf && Boolean(formik.errors.cf)}
                helperText={formik.touched.cf && formik.errors.cf}
              />
            </div>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BecomeSellerFormStep1;
