import Box from '@mui/material/Box';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../State/Store';
import DrawerList from '../../../component/DrawerList';

const Navbar = () => {

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategorySheet, setShowCategorySheet] = useState(false);
    const navigate = useNavigate();
    const { user } = useAppSelector(store => store);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

  return (
      <Box className="sticky top-0 left-0 right-0 bg-black" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] bg-white border-b-black border-b">
          <div className="flex items-center gap-9">
            <div onClick={() => navigate("/")} className="flex items-center gap-2">
              { !isLarge && (
                <IconButton onClick={() => toggleDrawer(true)}>
                  <MenuIcon sx={{ color: 'black' }} />
                </IconButton>
              )}
              <img src="/logo.png" alt="Logo" className="w-15 h-15" />
              <h1 onClick={() => navigate("/")} className="logo cursor-pointer text-lg font-bold md:text-2xl my-dark-blue">CampusMarket</h1>
            </div>
            <ul className="flex items-center text-black font-light relative">
              {mainCategory.map((item) => (
                <li
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowCategorySheet(true);
                  }}
                  key={item.categoryId}
                  className="mainCategories px-4 flex items-center h-full cursor-pointer hover:text-gray-600"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-4 items-center">
            <IconButton onClick={() => navigate("/search-products")}>
              <SearchIcon sx={{ color: 'black' }} />
            </IconButton>

              {user.user?.role === "ROLE_CUSTOMER" ?
              <div>
                <Button onClick={() => navigate("/account/orders")} className="flex items-center gap-2">
                  <p>Welcome,</p>
                  <h1 className="font-semibold hidden lg:block text-black">{user.user?.fullName}</h1>
                </Button>
                <IconButton onClick={() => navigate("/wishlist")}>
                  <FavoriteBorderIcon sx={{ fontSize: 29, color: 'black' }} />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")}>
                  <AddShoppingCartIcon sx={{ fontSize: 29, color: 'black' }} />
                </IconButton>
              </div>
              :
              <Button onClick={() => navigate("/login")} className='my-main-button-outlined'>Log In</Button>
              }

            { (!user.user || user.user?.role === "ROLE_CUSTOMER") && (
              <Button
                onClick={() => navigate("/become-seller")}
                startIcon={<StorefrontIcon />}
                className='my-main-button'
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList toggleDrawer={toggleDrawer} />}
        </Drawer>
        {showCategorySheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowCategorySheet(false)}
          onMouseEnter={() => setShowCategorySheet(true)}
          className="categorySheet absolute top-[4.41rem] left-20 right-20 "
        >
          <CategorySheet
            setShowCategorySheet={setShowCategorySheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
      </Box>
  )
}

export default Navbar
