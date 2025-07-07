import React from 'react'
import HomeCategoryTable from './HomeCategoryTable';
import { useAppSelector } from '../../../State/Store';

const ElectronicsTable = () => {

  const homePage= useAppSelector((store) => store.homePage);

  return (
    <div>
      <HomeCategoryTable categories={homePage.homePageData?.electricCategories} />
    </div>
  )
}

export default ElectronicsTable