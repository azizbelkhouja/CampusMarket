import React from 'react'
import WishlistProductCard from './WishlistProductCard';
import { useAppDispatch, useAppSelector } from '../../../State/Store';

const Wishlist = () => {
    
    const dispatch = useAppDispatch();
    const { wishlist } = useAppSelector(store => store)


    console.log("wishlist", wishlist)
    return (
        <div className='h-[85vh] p-5 lg:p-20'>
            {wishlist.wishlist?.products.length ?
                <section>
                    <h1><strong>Wishlist</strong> {wishlist.wishlist.products.length} items</h1>
                    <div className='pt-10 flex flex-wrap gap-5'>

                        {wishlist.wishlist?.products?.map((item) => <WishlistProductCard item={item} />)}
                        
                    </div>
                </section> :
                <div className="h-full flex justify-center items-center flex-col">
                    <div className="text-center py-5">
                        <h1 className="text-xl font-bold my-dark-blue">Its so empty here!</h1>
                        <p className="text-gray-500 text-sm">
                            there is nothing in your wishlist, Add items
                        </p>
                    </div>
                </div>}
        </div>
    )
}

export default Wishlist