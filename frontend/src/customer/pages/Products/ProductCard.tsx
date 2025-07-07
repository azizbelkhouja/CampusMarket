import React, { useEffect, useState } from 'react'
import './ProductCard.css'
import { Button } from '@mui/material';
import { Favorite, FavoriteBorder, ModeComment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/productTypes';
import { red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { addProductToWishlist } from '../../../State/customer/WishlistSlice';
import { isWishlisted } from '../../../util/isWishlisted';

const ProductCard = ({item}:{item:Product}) => {

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { wishlist } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const handleAddWishlist = (event: MouseEvent) => {
        event.stopPropagation();
        setIsFavorite((prev) => !prev);
        if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
  };

  useEffect(() => {

    let interval:any;

    if(isHovered) {
        interval = setInterval(() => {
          setCurrentImage((prevImage)=>(prevImage + 1) % item.images.length);
        }, 900);
    }
    else if(interval) {
        clearInterval(interval);
        interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length])


  return (
    <>
      <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className='group px-4 relative'>
        <div className='card' 
          onMouseEnter = {() => setIsHovered(true)}
          onMouseLeave = {() => setIsHovered(false)}
        >

          {item.images.map((item, index) => <img className='card-media object-top' src={item} alt="" 
          style={{transform: `translateX(${(index-currentImage)*100}%)`}}/>)}

          { isHovered &&
            <div className='indicator flex flex-col items-center space-y-2'>
              <div className='flex gap-3'>
                <Button variant='contained' sx={{backgroundColor: 'white', color: 'black', border: '1px solid black'}} onClick={handleAddWishlist} >
                  {isWishlisted(wishlist.wishlist, item) ? (
                          <Favorite sx={{ color: red[500] }} />
                      ) : (
                          <FavoriteBorder sx={{ color: "gray" }} />
                      )}
                </Button>
                <Button variant='contained' sx={{backgroundColor: 'white', color: 'black', border: '1px solid black'}}>
                  <ModeComment/>
                </Button>
              </div>
            </div>
          }
        </div>

        <div className='details pt-3 space-y-1 group-hover-effect'>
          <div className='name'>
            <h1>{item.seller?.preferredname}</h1>
            <p>{item.title}</p>
          </div>
          <div className='price flex items-center gap-3'>
            <span className='font-sans text-gray-800'>{item.sellingPrice}€</span>
            <span className='font-sans thin-line-through text-gray-400'>{item.mrpPrice}€</span>
            <span className='text-red-500 font-semibold'>-{item.discountPercent}%</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard