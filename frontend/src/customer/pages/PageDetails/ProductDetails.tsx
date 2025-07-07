import React, { useEffect, useState } from 'react'
import { AddShoppingCart, Close, FavoriteBorder, LocalShipping, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import { Button, IconButton, Snackbar } from '@mui/material';
import SimilarProduct from './SimilarProduct';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchProductById, getAllProducts } from '../../../State/customer/ProductSlice';
import { addItemToCart } from '../../../State/customer/CartSlice';
import { addProductToWishlist } from '../../../State/customer/WishlistSlice';

const ProductDetails = () => {

  const {productId,categoryId} = useParams();
  const { product } = useAppSelector(store => store);
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { user } = useAppSelector(store => store);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddWishlist = (event: MouseEvent) => {
    event.stopPropagation();
    setIsFavorite((prev) => !prev);
    setOpen(true);
  };

  useEffect(() => {
    if (productId) {
        dispatch(fetchProductById(Number(productId)))
    }
      dispatch(getAllProducts({ category: categoryId }));
  }, [categoryId, dispatch, productId])

  const handleAddCart = () => {
    dispatch(addItemToCart({
        jwt: localStorage.getItem('jwt'),
        request: {
          productId: Number(productId), size: "FREE",
          quantity: 1
        }
    }))
    setOpen(true);
  }

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={(event) => handleClose(event, 'buttonClick')}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(event) => handleClose(event, 'iconButtonClick')}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='px-5 lg:px-20 pt-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className="flex flex-col lg:flex-row gap-5">
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {product.product?.images.map((item, index) => <img onClick={() => setSelectedImage(index)} className='lg:w-full w-[50px] cursor-pointer rounded-md' src={item} alt="" />)}
          </div>
          <div className="w-full lg:w-[85%]">
            <img className='w-full rounded-md' src={product.product?.images[selectedImage]} alt="" />
          </div>
        </section>
        <section className="">
          <p className='font-bold text-3xl'>{product.product?.title}</p>
          <h1><strong>Seller:</strong> {product.product?.seller?.sellerName}</h1>
          <div>
            <div className='price flex items-center gap-3 mt-5 text-2xl'>
              <span className='font-sans text-gray-800'>{product.product?.sellingPrice}€</span>
              <span className='font-sans line-through text-gray-400'>{product.product?.mrpPrice}€</span>
              <span className='text-red-500 font-semibold'>
                {product.product?.mrpPrice && product.product?.sellingPrice
                  ? `-${Math.round(((product.product.mrpPrice - product.product.sellingPrice) / product.product.mrpPrice) * 100)}%`
                  : ''}
              </span>
            </div>
            <p className='text-sm text-personalgrey'>IVA included</p>
          </div>
          <div className='mt-7 space-y-3'>
            <div className="flex items-center gap-4">
              <Shield sx={{color:"#00B1D3"}}/>
              <p>Verified by <strong>CampusMarket</strong> for Quality & Authenticity</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{color:"#00B1D3"}}/>
              <p>100% Buyer Protection - Money Back if Unsatisfied</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{color:"#00B1D3"}}/>
              <p>Convenient On-Campus Pickup or Free Local Delivery</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{color:"#00B1D3"}}/>
              <p>Flexible Payment Options - Cash, Card, or Digital Wallets</p>
            </div>
          </div>

          {user.user && (
            <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              startIcon={<AddShoppingCart/>}
              className='my-main-button'
              onClick={handleAddCart}
            >
              Add To Cart
            </Button>
            <Button
              fullWidth
              startIcon={<FavoriteBorder/>}
              className='my-main-button-outlined'
              onClick={handleAddWishlist}
            >
              WishList
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Added Successfully"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              action={action}
              sx={{
                '& .MuiSnackbarContent-root': {
                  backgroundColor: '#4caf50',
                  color: '#fff'
                }
              }}
            />
          </div>)}
        </section>
      </div>

      <div className='mt-20'>
        <h1 className='text-lg font-bold'>Similar Products</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>

    </div>
  )
}

export default ProductDetails