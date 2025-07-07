import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthSlice from "./AuthSlice";
import UserSlice from "./customer/UserSlice";
import ProductSlice from "./customer/ProductSlice";
import CartSlice from "./customer/CartSlice";
import OrderSlice from "./customer/OrderSlice";
import CouponSlice from "./customer/CouponSlice";
import WishlistSlice from "./customer/WishlistSlice";
import CustomerSlice from "./customer/Customer/CustomerSlice";
import sellerAuthenticationSlice from "./seller/sellerAuthenticationSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import payoutSlice from "./seller/payoutSlice";
import transactionSlice from "./seller/transactionSlice";
import revenueChartSlice from "./seller/revenueChartSlice";
import sellerSlice from './seller/sellerSlice';
import AdminCouponSlice from "./admin/AdminCouponSlice";
import DealSlice from "./admin/DealSlice";
import AdminSlice from "./admin/AdminSlice";

const rootReducer = combineReducers({
  
// customer
auth: AuthSlice,
user: UserSlice,
product: ProductSlice,
cart: CartSlice,
orders: OrderSlice,
coupon: CouponSlice,
wishlist: WishlistSlice,
homePage:CustomerSlice,

// seller
sellers: sellerSlice,
sellerAuth: sellerAuthenticationSlice,
sellerProduct: sellerProductSlice,
sellerOrder: sellerOrderSlice,
payouts: payoutSlice,
transaction: transactionSlice,
revenueChart: revenueChartSlice,

// admin
adminCoupon:AdminCouponSlice,
adminDeals:DealSlice,
admin:AdminSlice,
deal:DealSlice

});

const store = configureStore({
reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
  