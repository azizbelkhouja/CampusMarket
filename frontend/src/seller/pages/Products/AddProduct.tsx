/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddPhotoAlternate as AddPhotoAlternateIcon, Close as CloseIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { furnitureAndDormItems } from '../../../data/category/level-three/furnitureslevelthree';
import { electronicsItems } from '../../../data/category/level-three/electronicslevelthree';
import { clothingItems } from '../../../data/category/level-three/clothinglevelthree';
import { electronicsleveltwo } from '../../../data/category/level-two/electronicsleveltwo';
import { clothingleveltwo } from '../../../data/category/level-two/clothingleveltwo';
import { Alert, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { mainCategory } from '../../../data/category/mainCategory';
import { studyresourcesleveltwo } from '../../../data/category/level-two/studyresourcesleveltwo';
import { colors } from '../../../data/Filter/color';
import { uploadToCloudinary } from '../../../util/uploadToCloudinary';
import { createProduct } from '../../../State/seller/sellerProductSlice';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useNavigate } from 'react-router-dom';

const categoryTwo: { [key: string]: any[] } = {
  men: clothingleveltwo,
  women: clothingleveltwo,
  study_resources: studyresourcesleveltwo,
  electronics: electronicsleveltwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: clothingItems, 
  women: clothingItems,
  beds_mattresses: furnitureAndDormItems,
  electronics: electronicsItems,
};

const ProductForm = () => {

  const dispatch = useAppDispatch();
  const [snackbarOpen, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
      dispatch(createProduct({ request:values, jwt:localStorage.getItem("jwt") }));
      console.log(values);
    },
  });

  const handleSubmit = () => {
    //submit form data to server
    formik.handleSubmit();
    console.log("Product Added");
  };

  const [uploadImage, setUploadingImage] = useState(false);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };

  const { sellers, sellerProduct } = useAppSelector(store => store);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  useEffect(() => {
    if (sellerProduct.productCreated || sellerProduct.error) {
      setOpenSnackbar(true)
    }
  }, [sellerProduct.productCreated,sellerProduct.error])

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{xs:12}}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover"
                    key={index}
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=""
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              sx={{
                '& label.Mui-focused': { color: 'black' },
                '& input': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Description"
              sx={{
                '& label.Mui-focused': { color: 'black' },
                '& input': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={formik.touched.description && formik.errors.description}
              required
            />
          </Grid>
          <Grid size={{xs:12, md:4, lg:3}}>
            <TextField
              fullWidth
              id="mrp_price"
              name="mrpPrice"
              label="Original Price"
              type="number"
              sx={{
                '& label.Mui-focused': { color: 'black' },
                '& input': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>
          <Grid size={{xs:12, md:4, lg:3}}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              sx={{
                '& label.Mui-focused': { color: 'black' },
                '& input': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' }
                }
              }}
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            />
          </Grid>

          <Grid  size={{xs:12, md:4, lg:3}}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                label="Color"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: 'black' },
                    '&.Mui-focused fieldset': { borderColor: 'black' }
                  },
                  '& label': { color: 'black' },
                  '& label.Mui-focused': { color: 'black' }
                }}
                value={formik.values.color}
                onChange={formik.handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {colors.map((color, index) => <MenuItem value={color.name}>
                  <div className="flex gap-3">
                    <span style={{ backgroundColor: color.hex }} className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}></span>
                    <p>{color.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText sx={{ color: 'black' }}>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:4, lg:3}}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                label="Sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
              >
                <MenuItem value="STANDARD">STANDARD</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid  size={{xs:12, md:4, lg:4}}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
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
                {mainCategory.map((item) => (
                  <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid  size={{xs:12, md:4, lg:4}}>
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
          </Grid>
          <Grid  size={{xs:12, md:4, lg:4}}>
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
          </Grid>
          <Grid  size={{xs:12}}>
            <Button className='my-main-button w-full' disabled={sellerProduct.loading} onClick={handleSubmit}>
              {sellerProduct.loading ? <CircularProgress size={24} /> : "Create Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerProduct.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {sellerProduct.error ? sellerProduct.error : "Product created successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductForm