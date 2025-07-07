import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const DealCategoryTable = () => {

  const homePage = useAppSelector((store) => store.homePage);

  return (
    <div>
        <HomeCategoryTable categories={homePage.homePageData?.dealCategories}/>
    </div>
  )
}

export default DealCategoryTable