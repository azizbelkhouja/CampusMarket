import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../customer/pages/Home/Home'
import Wishlist from '../customer/pages/Wishlist/Wishlist'
import SearchProducts from '../customer/pages/Search/SearchProducts'
import { useAppDispatch, useAppSelector } from '../State/Store'
import { fetchUserCart } from '../State/customer/CartSlice'
import { getWishlistByUserId } from '../State/customer/WishlistSlice'
import Cart from '../customer/pages/Cart/Cart'
import Auth from '../customer/pages/Auth/Auth'
import PaymentSuccessHandler from '../customer/pages/Payment/PaymentSuccessHandler'
import Products from '../customer/pages/Products/Products'
import ProductDetails from '../customer/pages/PageDetails/ProductDetails'
import Account from '../customer/pages/Account/Account'
import NotFound from '../customer/pages/NotFound/NotFound'
import Checkout from '../customer/pages/Checkout/Checkout'


const CustomerRoutes = () => {

    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    useEffect(() => {
        dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
        dispatch(getWishlistByUserId())
    }, [auth.jwt, dispatch]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/:categoryId' element={<Products />} />
                <Route path='/search-products' element={<SearchProducts />} />
                <Route path='/product-details/5' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/checkout/address' element={<Checkout />} />
                <Route path='/account/*' element={<Account />} />
                <Route path='/login' element={<Auth/>} />
                <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler/>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )

    
}

export default CustomerRoutes