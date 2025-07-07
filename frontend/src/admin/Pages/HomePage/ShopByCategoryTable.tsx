import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const ShopByCategoryTable = () => {

  const homePage = useAppSelector((store) => store.homePage);
  
  return (
    <div>
      <HomeCategoryTable categories={homePage.homePageData?.shopByCategories} />
    </div>
  )
}

export default ShopByCategoryTable