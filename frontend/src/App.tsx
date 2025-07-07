import React, { useEffect } from 'react'
import './App.css'
import Navbar from './customer/components/Navbar/Navbar'
import Home from './customer/pages/Home/Home'
import Footer from './customer/components/Footer/Footer'
import Products from './customer/pages/Products/Products'
import ProductDetails from './customer/pages/PageDetails/ProductDetails'
import Cart from './customer/pages/Cart/Cart'
import Checkout from './customer/pages/Checkout/Checkout'
import Account from './customer/pages/Account/Account'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller'
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard'
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard'
import AdminAuth from './admin/Pages/Auth/AdminAuth'
import CustomerRoutes from './Routes/CustomerRoutes'
import { useAppDispatch, useAppSelector } from './State/Store'
import { fetchUserProfile } from './State/customer/UserSlice'
import { fetchSellerProfile } from './State/seller/sellerSlice'
import { createHomeCategories } from './State/customer/Customer/AsyncThunk'
import { homeCategories } from './data/homeCategories'
import AdminNavbar from './admin/Pages/Dashboard/AdminNavbar'
import SellerAccountVerification from './seller/pages/SellerAccountVerification'
import SellerAccountVerified from './seller/pages/SellerAccountVerified'
import AdminRoutes from './Routes/AdminRoutes'
import GridTable from './admin/Pages/HomePage/GridTable'

function App() {

  const dispatch = useAppDispatch()
  const { auth, sellerAuth, sellers, user } = useAppSelector(store => store)
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUserProfile({jwt:localStorage.getItem("jwt") || auth.jwt || "", navigate}));
      dispatch(fetchSellerProfile(localStorage.getItem("jwt") || sellerAuth.jwt))
    }

  }, [auth.jwt, dispatch, navigate, sellerAuth.jwt])

  useEffect(() => {
    dispatch(createHomeCategories(homeCategories))
  }, [dispatch])

  return (
    <>
      {user.user?.role === "ROLE_ADMIN" || user.user?.role === "ROLE_SELLER" ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
        <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/admin-login" element={<AdminAuth />} />
        {sellers.profile && <Route path="/seller/*" element={<SellerDashboard />} />}
        {user.user?.role === "ROLE_ADMIN" && <Route path="/admin/*" element={<AdminDashboard />} />}
        <Route path="*" element={<CustomerRoutes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
