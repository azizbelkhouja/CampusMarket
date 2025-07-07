import React from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch } from '../../../State/Store';
import { createOrder } from '../../../State/customer/OrderSlice';
import type { Address } from '../../../types/userTypes';

const AddressFormSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    mobile: Yup.string().required('Required').matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
    pinCode: Yup.string().required('Required').matches(/^[0-9]+$/, 'Must be only digits').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    locality: Yup.string().required('Required')
})

interface AddressFormProp {
    handleClose: () => void;
    paymentGateway:string
}

const AddressForm:React.FC<AddressFormProp> = ({handleClose, paymentGateway}) => {

    const dispatch=useAppDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            pinCode: '',
            address: '',
            city: '',
            state: '',
            locality:""
        },
        validationSchema: AddressFormSchema,
        onSubmit: (values) => {
            console.log(values);
            handleCreateOrder(values as Address);
            handleClose();
        },
    });

    const handleCreateOrder=(address:Address)=>{
        dispatch(createOrder({address,jwt:localStorage.getItem('jwt')|| "", paymentGateway}))
    }

  return (
    <Box sx={{max:"auto"}}>
        <p className='text-xl font-bold text-center pb-5 my-dark-blue'>Contact Details</p>
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                    <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField
                    fullWidth
                    name="mobile"
                    label="Mobile Number"
                    variant="outlined"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField
                    fullWidth
                    name="pinCode"
                    label="Pin Code"
                    variant="outlined"
                    value={formik.values.pinCode}
                    onChange={formik.handleChange}
                    error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                    helperText={formik.touched.pinCode && formik.errors.pinCode}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField
                    fullWidth
                    name="address"
                    label="Address"
                    variant="outlined"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField
                    fullWidth
                    name="city"
                    label="City"
                    variant="outlined"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField
                    fullWidth
                    name="state"
                    label="State"
                    variant="outlined"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField
                    fullWidth
                    name="locality"
                    label="Locality"
                    variant="outlined"
                    value={formik.values.locality}
                    onChange={formik.handleChange}
                    error={formik.touched.locality && Boolean(formik.errors.locality)}
                    helperText={formik.touched.locality && formik.errors.locality}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <Button className='my-main-button' type="submit" fullWidth>
                        Add Address
                    </Button>
                </Grid>
                
            </Grid>
        </form>
    </Box>
  )
}

export default AddressForm