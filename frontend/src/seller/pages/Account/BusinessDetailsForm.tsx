import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { updateSeller } from "../../../State/seller/sellerSlice";

export interface UpdateDetailsFormProps {
  onClose: () => void;
}
const BusinessDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {

  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((store) => store);
 
  const formik = useFormik({
    initialValues: {
      businessName: "",
      cf: "",
      accountStatus: "",
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required("Business Name is required"),
      cf: Yup.string().required("CF is required"),
      accountStatus: Yup.string().required("Account Status is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        updateSeller({
          ...values,
          businessDetails: { businessName: values.businessName },
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    if (sellers.profile) {
      formik.setValues({
        businessName: sellers.profile?.preferredname,
        cf: sellers.profile?.cf,
        accountStatus: sellers.profile?.accountStatus ?? "",
      });
    }
  }, [formik, sellers.profile]);

  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Business Details
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="businessName"
          name="businessName"
          label="Displayed Name"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          error={
            formik.touched.businessName && Boolean(formik.errors.businessName)
          }
          helperText={formik.touched.businessName && formik.errors.businessName}
        />
        <TextField
          fullWidth
          id="fiscalCode"
          name="fiscalCode"
          label="fiscalCode"
          value={formik.values.cf}
          onChange={formik.handleChange}
          error={formik.touched.cf && Boolean(formik.errors.cf)}
          helperText={formik.touched.cf && formik.errors.cf}
        />
        <TextField
          fullWidth
          id="accountStatus"
          name="accountStatus"
          label="Account Status"
          value={formik.values.accountStatus}
          onChange={formik.handleChange}
          error={
            formik.touched.accountStatus && Boolean(formik.errors.accountStatus)
          }
          helperText={
            formik.touched.accountStatus && formik.errors.accountStatus
          }
        />
        <Button
          className="my-main-button"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default BusinessDetailsForm;
