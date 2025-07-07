import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'
import { useAppSelector } from '../../../../State/Store';

const temporaryitems = [
  {
    categoryId: "laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", // Laptop
    name: "Student Laptops",
  },
  {
    categoryId: "coffee_makers",
    image: "https://images.unsplash.com/photo-1637029436347-e33bf98a5412?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwbWFjaGluZXxlbnwwfHwwfHx8MA%3D%3D", // Coffee Maker
    name: "Coffee Essentials",
  },
  {
    categoryId: "desk_accessories",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVza3xlbnwwfHwwfHx8MA%3D%3D", // Desk setup
    name: "Study Desk Gear",
  },
  {
    categoryId: "backpacks",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D", // Backpack
    name: "Backpacks & Bags",
  },
  {
    categoryId: "microwaves",
    image: "https://plus.unsplash.com/premium_photo-1673439305380-79947d273735?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1pY3Jvd2F2ZXxlbnwwfHwwfHx8MA%3D%3D", // Microwave
    name: "Quick Meal Microwaves",
  },
]


const ShopByCategory = () => {

  const { homePage} = useAppSelector((store) => store);

  return (
    <div className='flex flex-wrap justify-between lg:px-20 gap-7'>
      {temporaryitems.map((item, index) => (
      <div
        key={index}
        className="custom-border flex gap-3 flex-col justify-center items-center group cursor-pointer"
      >
        <div className="w-[120px] h-[250px] rounded-full lg:w-[220px] lg:h-[400px]">
          <img
            className="object-cover object-top h-full w-full"
            src={item.image}
            alt={item.name}
          />
        </div>
        <h1>{item.name}</h1>
      </div>
      ))}
      {homePage.homePageData?.shopByCategories?.map((item) => <ShopByCategoryCard item={item} />)}
    </div>
  )
}

export default ShopByCategory