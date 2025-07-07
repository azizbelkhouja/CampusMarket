import React, { useEffect, useState } from 'react'
import { Close, Favorite, LocalOffer } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material';
import PricingCard from './PricingCard';
import { useNavigate } from 'react-router-dom';
import CartItemCard from './CartItemCard';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchUserCart } from '../../../State/customer/CartSlice';
import { applyCoupon } from '../../../State/customer/CouponSlice';
import type { CartItem } from '../../../types/cartTypes';

const Cart = () => {

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useAppDispatch();
  const { cart, auth, coupon } = useAppSelector((store) => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = (apply: string) => {
    // console.log(couponCode,apply)
    var code = couponCode;
    if (apply == "false") {
      code = cart.cart?.couponCode || "";
    }
    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  }

  useEffect(() => {
    if (coupon.couponApplied || coupon.error) {
      setOpenSnackbar(true);
      setCouponCode("");
    }
  }, [coupon.couponApplied, coupon.error]);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [auth.jwt, dispatch]);
  
  return (
    <>
      <div className="pt-5 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          <div className="lg:col-span-2 space-y-3 ">
            {cart.cart?.cartItems.map((item: CartItem) => (
              <CartItemCard key={item.id} item={item}/>
            ))}
          </div>

          <div className="col-span-1  text-sm space-y-3">
            <div className="border rounded-md px-5 py-3 space-y-5">
              <div className="">
                <div className="flex gap-3 text-sm items-center">
                  <LocalOffer
                    sx={{ color: "black", fontSize: "17px" }}
                  />
                  <span>Apply Coupons</span>
                </div>
              </div>
              {!cart.cart?.couponCode ? (
                <div className="flex justify-between items-center">
                  <TextField
                    value={couponCode}
                    onChange={handleChange}
                    placeholder="coupon code"
                    className=""
                    size="small"
                  />
                  <Button
                    onClick={() => handleApplyCoupon("true")}
                    disabled={couponCode ? false : true}
                    size="small"
                  >
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex">
                  <div className="pl-5 pr-3 border rounded-full flex gap-2 items-center">
                    <span className="">{cart.cart.couponCode} Applied</span>
                    <IconButton
                      onClick={() => handleApplyCoupon("false")}
                      size="small"
                    >
                      <Close className="text-red-600" />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>

            <section className="border rounded-md">
              <PricingCard />
              <div className="p-5">
                <Button
                  onClick={() => navigate("/checkout/address")}
                  className='my-main-button-outlined'
                  variant="contained"
                  fullWidth
                >
                  BUY NOW
                </Button>
              </div>
            </section>

            <div className="border rounded-md px-5 py-4 flex justify-between items-center cursor-pointer">
              <span>Add From Whishlist</span>
              <Favorite sx={{ color: "black", fontSize: "21px" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart