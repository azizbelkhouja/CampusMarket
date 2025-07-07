import React from 'react'
import ElectronicsCategoryCard from './ElectronicsCategoryCard'
import { useAppSelector } from '../../../../State/Store';

const ElectronicsCategory = () => {

  const {homePage}=useAppSelector(store=>store);

  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {homePage.homePageData?.electricCategories?.map((item) => (
          <ElectronicsCategoryCard item={item}/>
        ))}
    </div>
  );
}

export default ElectronicsCategory