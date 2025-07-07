import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const GridTable = () => {

  const homePage = useAppSelector((store) => store.homePage);

  return (
    <div>
      <HomeCategoryTable categories={homePage.homePageData?.grid} />
    </div>
  )
}

export default GridTable