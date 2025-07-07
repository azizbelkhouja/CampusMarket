/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, type MouseEvent } from 'react';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/productTypes';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../State/Store';
import { addProductToWishlist } from '../../../State/customer/WishlistSlice';

interface ProductCardProps {
    item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
    
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleIconClick = (e:MouseEvent) => {
        setIsFavorite((prev) => !prev);
        if(item.id)
        dispatch(addProductToWishlist({productId:item.id}))
    };

    return (
        <div className='w-60 relative '>
            <div className="w-full" >
                <img
                    className=" object-top w-full"
                    src={item.images[0]}
                    alt={`product-${item.title}`}

                />
            </div>
            <div className='pt-3 space-y-1  rounded-md '>
                <div className=' space-y '>
                    <p className=''>{item.title}</p>
                </div>
                <div className=' flex items-center gap-3 '>
                    <span className='font-semibold text-gray-800'>{item.sellingPrice}€</span>
                    <span className='text thin-line-through text-gray-400 '>{item.mrpPrice}€</span>
                    <span className='text-red font-semibold'>{item.discountPercent}% off</span>
                </div>
            </div>
            <div className='absolute top-1 right-1'>
                <button onClick={handleIconClick}>
                    <CloseIcon className='cursor-pointer bg-white rounded-full p-1' sx={{ color: red[500], fontSize:"2rem"  }} />
                </button>
            </div>
            
        </div>
    );
};



export default WishlistProductCard