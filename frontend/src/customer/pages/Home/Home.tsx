import React from 'react'
import ElectronicsCategory from './ElectronicsCategory/ElectronicsCategory'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../../../State/Store';
import DealSlide from './Deal/Deal';

const Home = () => {

  const navigate = useNavigate();
  const { homePage } = useAppSelector(store => store);

  return (
    <>
      {(!homePage.loading)?
      <><div className="space-y-5 lg:space-y-10 relative">
          {homePage.homePageData?.electricCategories && <ElectronicsCategory />}
        </div><div className='space-y-5 lg:space-y-10 relative p-15'>
            <CategoryGrid />

            <div className='pt-20'>
              <h1 className='text-lg lg:text-4xl font-bold pb-3 lg:pb-15 text-center'>TODAY'S TOP DEALS</h1>
              <DealSlide/>
            </div>
            
            <section className='py-20'>
              <h1 className='text-lg lg:text-4xl font-bold pb-5 lg:pb-17 text-center'>SHOP BY CATEGORY</h1>
              <ShopByCategory/>
            </section>

            <section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>
              <img className='w-full h-full opacity-60' src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
                <h1>List And Sell  <span className="my-dark-blue">•</span>  Search And Buy</h1>
                <p className='text-lg md:text-2xl'>On <span className='logo my-dark-blue'>CampusMarket</span></p>
                <div className='pt-4 flex justify-start items-center gap-4'>
                  <Button
                    startIcon={<StorefrontIcon />}
                    onClick={() => navigate("/become-seller")}
                    className='my-main-button'
                  >
                    List
                  </Button>

                  <Button
                    startIcon={<SearchIcon />}
                    onClick={() => navigate("/search-products")}
                    className='my-main-button'
                  >
                    Search
                  </Button>

                </div>
              </div>
            </section>
          </div></>
      : <Backdrop
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
      }
    </>
  )
}

export default Home