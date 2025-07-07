import React from 'react'
import DealCard from './DealCard';
import { useAppSelector } from '../../../../State/Store';
import type { Deal } from '../../../../types/dealTypes';

const temporarydeals = [
  {
    category: {
      categoryId: "laptops",
      image: "https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D", // laptop image
    },
    discount: 15,
  },
  {
    category: {
      categoryId: "desk_chairs",
      image: "https://images.unsplash.com/photo-1506326426992-32b61983f2fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhaXJ8ZW58MHx8MHx8fDA%3D", // chair image
    },
    discount: 25,
  },
  {
    category: {
      categoryId: "snacks",
      image: "https://images.unsplash.com/photo-1517093602195-b40af9688b46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c25hY2tzfGVufDB8fDB8fHww", // snack image
    },
    discount: 10,
  },
  {
    category: {
      categoryId: "headphones",
      image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D", // headphones
    },
    discount: 20,
  },
  {
    category: {
      categoryId: "stationery",
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D", // pens, notebooks
    },
    discount: 30,
  },
]


const DealSlide = () => {

  const {homePage} = useAppSelector(store => store);

  return (
    <div className="py-5 lg:px-20">
      <div className="flex items-center justify-between gap-2">
        {temporarydeals.map((deal, index) => (
        <div
          key={index}
          className="w-[12rem] cursor-pointer"
        >
          <img
            className="border-x-[7px] border-t-[7px] w-full h-[12rem] object-cover object-top border-black p-2"
            src={deal.category.image}
            alt={deal.category.categoryId}
          />
          <div className="border-4 border-black bg-black text-white p-2 text-center">
            <p className="text-lg font-semibold">
              {deal.category.categoryId.split("_").join(" ")}
            </p>
            <p className="text-2xl font-bold">{deal.discount}% OFF</p>
            <p className="text-balance text-lg bg-white text-black mt-2 font-medium">
              Shop Now
            </p>
          </div>
        </div>
      ))}

      {homePage.homePageData?.deals?.map((item:Deal) => (
        <div className="border flex flex-col items-center justify-center">
          <DealCard deal={item} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default DealSlide