import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    CircularProgress,
    IconButton,
    Snackbar,
    Alert,
    Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../../State/seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { colors } from "../../../data/Filter/color";
import type { Seller } from "../../../types/sellerTypes";
import { fetchProductById } from "../../../State/customer/ProductSlice";

interface FormValues {
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    quantity: number;
    color: string;
    images: string[];
    category: any;
    sizes: string;
    seller: Seller | undefined,
    createdAt: any,
    numRatings: number;
    in_stock: boolean;
}
const UpdateProductForm = () => {
    const [uploadImage, setUploadingImage] = useState(false);
    const dispatch = useAppDispatch();
    const { sellerProduct, product } = useAppSelector(store => store);
    const { productId } = useParams();

    const [snackbarOpen, setOpenSnackbar] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues:
        {
            title: "",
            description: "",
            mrpPrice: 0,
            sellingPrice: 0,
            quantity: 0,
            color: "",
            images: [],
            category: null,
            sizes: "",
            seller:undefined,
            createdAt:null,
            numRatings:0,
            in_stock: true,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateProduct({ productId:Number(productId),product:values}))
            console.log(values);
        },
    });

    const handleImageChange = async (event: any) => {
        const file = event.target.files[0];
        setUploadingImage(true);
        const image = await uploadToCloudinary(file);
        // const image = URL.createObjectURL(file);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadingImage(false);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }
    useEffect(() => {
        dispatch(fetchProductById(Number(productId)));
    }, [dispatch, productId])

    useEffect(() => {
        if (sellerProduct.productCreated || sellerProduct.error) {
            setOpenSnackbar(true)
        }
    }, [sellerProduct.productCreated, sellerProduct.error])

    useEffect(() => {
        formik.setValues({

            title: product.product?.title || "",
            description: product.product?.description || "",
            mrpPrice: product.product?.mrpPrice || 0,
            sellingPrice: product.product?.sellingPrice || 0,
            quantity: product.product?.quantity || 0,
            color: product.product?.color || "",
            images: product.product?.images || ["image/"],
            category:  product.product?.category,
            
            sizes: product.product?.sizes ||  "",
            seller:product.product?.seller ,

            createdAt:product.product?.createdAt || "",
            numRatings:product.product?.numRatings || 0,
            in_stock: product.product?.in_stock || true,

        })
    }, [formik, product.product])

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
                <Grid container spacing={3}>
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
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description && Boolean(formik.errors.description)
                            }
                            helperText={formik.touched.description && formik.errors.description}
                            required
                        />
                    </Grid>
                    <Grid size={{xs:12}}>
                        <TextField
                            fullWidth
                            id="mrp_price"
                            name="mrpPrice"
                            label="MRP Price"
                            type="number"
                            value={formik.values.mrpPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
                            helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
                            required
                        />
                    </Grid>
                    <Grid size={{xs:12}}>
                        <TextField
                            fullWidth
                            id="sellingPrice"
                            name="sellingPrice"
                            label="Selling Price"
                            type="number"
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

                    <Grid size={{xs:12}}>
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
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                label="Color"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {colors.map((color, index) => <MenuItem value={color.name}>
                                    <div className="flex gap-3">
                                        <span style={{ backgroundColor: color.hex }} className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}></span>
                                        <p>{color.name}</p>
                                    </div>
                                </MenuItem>)}
                            </Select>
                            {formik.touched.color && formik.errors.color && (
                                <FormHelperText>{formik.errors.color}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid size={{xs:12}}>
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
                                value={formik.values.sizes}
                                onChange={formik.handleChange}
                                label="Sizes"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="FREE">FREE</MenuItem>
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
                  
               
                    <Grid size={{xs:12}}>
                        <Button
                            className="my-main-button"
                            fullWidth
                            type="submit"
                            disabled={sellerProduct.loading}
                        >
                            {sellerProduct.loading ? <CircularProgress size="small"
                                sx={{ width: "27px", height: "27px" }} /> : "Update Product"}
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

export default UpdateProductForm;
