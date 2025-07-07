import React from 'react'
import DrawerList from '../../component/DrawerList'
import { AccountBox, Add, Category, Dashboard, ElectricBolt, Home, IntegrationInstructions, LocalOffer, Logout } from '@mui/icons-material';

const menu = [
  {
      name: "Dashboard",
      path: "/admin",
      icon: <Dashboard className="text-[#213D72]" />,
      activeIcon: <Dashboard className="text-white" />,
  },
  {
      name: "Coupons",
      path: "/admin/coupon",
      icon: <IntegrationInstructions className="text-[#213D72]" />,
      activeIcon: <IntegrationInstructions className="text-white" />,
  },
  {
      name: "Add New Coupon",
      path: "/admin/add-coupon",
      icon: <Add className="text-[#213D72]" />,
      activeIcon: <Add className="text-white" />,
  },
  {
      name: "Home Page",
      path: "/admin/home-grid",
      icon: <Home className="text-[#213D72]" />,
      activeIcon: <Home className="text-white" />,
  },
  {
      name: "Electronics Category",
      path: "/admin/electronics-category",
      icon: <ElectricBolt className="text-[#213D72]" />,
      activeIcon: <ElectricBolt className="text-white" />,
  },
  {
      name: "Shop By Category",
      path: "/admin/shop-by-category",
      icon: <Category className="text-[#213D72]" />,
      activeIcon: <Category className="text-white" />,
  },
  {
      name: "Deals",
      path: "/admin/deals",
      icon: <LocalOffer className="text-[#213D72]" />,
      activeIcon: <LocalOffer className="text-white" />,
  },
 
];

const menu2 = [

  {
      name: "Account",
      path: "/admin/account",
      icon: <AccountBox className="text-[#213D72]" />,
      activeIcon: <AccountBox className="text-white" />,
  },
  {
      name: "Logout",
      path: "/",
      icon: <Logout className="text-[#213D72]" />,
      activeIcon: <Logout className="text-white" />,
  },

]

interface DrawerListProps{
    toggleDrawer?:any;
}

const AdminDrawerList = ({toggleDrawer}:DrawerListProps) => {
  return (
    <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
  )
}

export default AdminDrawerList