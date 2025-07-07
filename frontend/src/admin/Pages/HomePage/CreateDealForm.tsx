import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createDeal } from '../../../State/admin/DealSlice';

const CreateDealForm = () => {

    const homePage = useAppSelector(store => store.homePage);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            discount: 0,
            category: ""
        },
        validationSchema: Yup.object({
            discount: Yup.number()
                .min(1, "Discount must be at least 1%")
                .max(100, "Discount cannot exceed 100%")
                .required("Discount is required"),
            category: Yup.string().required("Category is required"),
        }),
        onSubmit: (values) => {
            console.log(values);

            dispatch(createDeal({
                discount: values.discount, category: {
                  id: values.category
                }
            }))
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ maxWidth: 500, margin: "auto", padding: 3 }}
        >
            <Typography className='text-center' variant="h4" gutterBottom>
                New Deal
            </Typography>

            <TextField
                fullWidth
                id="discount"
                name="discount"
                label="Discount"
                type="number"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.touched.discount && formik.errors.discount}
            />

            <FormControl
                fullWidth
                error={formik.touched.category && Boolean(formik.errors.category)}
                required
                sx={{ marginTop: 2 }}
            >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label="Category"
                    
                >
                    {homePage.homePageData?.dealCategories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.categoryId}</MenuItem>
                    ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                    <FormHelperText>{formik.errors.category}</FormHelperText>
                    )}
            </FormControl>

            <Button
                fullWidth
                type="submit"
                className='my-main-button'
                sx={{ marginTop: 2 }}
            >
                Add
            </Button>
        </Box>
    );
};

export default CreateDealForm;
