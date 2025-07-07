/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Orders from './Orders'
import OrderDetails from './OrderDetails'
import UserDetails from './UserDetails'
import Address from './Address'
import SavedCards from './SavedCards'
import { useAppDispatch } from '../../../State/Store'
import { performLogout } from '../../../State/AuthSlice'

const menu = [
  {name: "Orders", path: "/account/orders"},
  {name: "Profile", path: "/account"},
  {name: "Saved Cards", path: "/account/saved-cards"},

  {name: "Addresses", path: "/account/addresses"},
  {name: "Logout", path: "/"}
]

const Account = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
  };

  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      handleLogout();
    } else navigate(`${item.path}`);
  };

  return (
    <div className='lg:px-22 min-h-screen mt-5'>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <section className="left col-span-1 lg:border-r lg:pr-5 py-5 h-full">
          {
            menu.map((item) => (
              <div onClick={() => handleClick(item)} key={item.name}
                className={` ${item.path === location.pathname ? 'bg-[#213D72] text-white' : 'text-black'}
                  py-3 cursor-pointer hover:bg-[#213D72] hover:bg-opacity-80 hover:text-white px-5 rounded-md`}>
                <p>{item.name}</p>
              </div>
            ))
          }
        </section>
        
        <section className="right lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId/:orderItemId" element={<OrderDetails />} />
            <Route path="/addresses" element={<Address />} />
            <Route path="/saved-cards" element={<SavedCards />} />
          </Routes>
        </section>
      </div>
    </div>
  )
}

export default Account