import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, MenuItem, InputLabel, FormControl, Select, Box, FormHelperText } from "@mui/material";
import { mainCategory } from "../../../data/category/mainCategory";
import { clothingleveltwo } from "../../../data/category/level-two/clothingleveltwo";
import { studyresourcesleveltwo } from "../../../data/category/level-two/studyresourcesleveltwo";
import { furnituresleveltwo } from "../../../data/category/level-two/furnituresleveltwo";
import { electronicsleveltwo } from "../../../data/category/level-two/electronicsleveltwo";
import { clothingItems } from "../../../data/category/level-three/clothinglevelthree";
import { studyResourcesItems } from "../../../data/category/level-three/studyresourceslevelthree";
import { furnitureAndDormItems } from "../../../data/category/level-three/furnitureslevelthree";
import { electronicsItems } from "../../../data/category/level-three/electronicslevelthree";
import type { HomeCategory } from "../../../types/homeDataTypes";
import { useAppDispatch } from "../../../State/Store";
import { updateHomeCategory } from "../../../State/admin/AdminSlice";

// Define validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.string().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

const categoryTwo: { [key: string]: any[] } = {
  clothes: clothingleveltwo,
  studyresources: studyresourcesleveltwo,
  home_furniture: furnituresleveltwo,
  beauty: [],
  electronics: electronicsleveltwo,
};

const categoryThree: { [key: string]: any[] } = {
  clothes: clothingItems,
  studyresources: studyResourcesItems,
  home_furniture: furnitureAndDormItems,
  beauty: [],
  electronics: electronicsItems,

};
const UpdateHomeCategoryForm = ({
  category,
  handleClose,
}: {
  category: HomeCategory | undefined;
  handleClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      image: "",
      category: "",
      category2: "",
      category3: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values, category);
      if (category?.id) {
        dispatch(
          updateHomeCategory({
            id: category.id,
            data: { image: values.image, categoryId: values.category3 },
          })
        );
      }
      handleClose();
    },
  });

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", padding: 3 }}
      className="space-y-6"
    >
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>

      {/* Image Field */}
      <TextField
        fullWidth
        id="image"
        name="image"
        label="Image URL"
        value={formik.values.image}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />

      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Category2</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          label="Category2"
        >
          {mainCategory.map((item) => (
            <MenuItem value={item.categoryId}>{item.name}</MenuItem>
          ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category2-label">Second Category</InputLabel>
        <Select
          labelId="category2-label"
          id="category2"
          name="category2"
          value={formik.values.category2}
          onChange={formik.handleChange}
          label="Second Category"
        >
          {formik.values.category &&
            categoryTwo[formik.values.category]?.map((item) => (
              <MenuItem value={item.categoryId}>{item.name}</MenuItem>
            ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>
      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Third Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category3"
          value={formik.values.category3}
          onChange={formik.handleChange}
          label="Third Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {formik.values.category2 &&
            childCategory(
              categoryThree[formik.values.category],
              formik.values.category2
            )?.map((item: any) => (
              <MenuItem value={item.categoryId}>{item.name}</MenuItem>
            ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button
        fullWidth
        type="submit"
        className="my-main-button"
      >
        Submit
      </Button>
    </Box>
  );
};

export default UpdateHomeCategoryForm;
