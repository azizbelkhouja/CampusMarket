package com.aziz.campusmarket.service.impl;

import com.aziz.campusmarket.modal.Product;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.modal.Wishlist;
import com.aziz.campusmarket.repository.ProductRepository;
import com.aziz.campusmarket.repository.WishlistRepository;
import com.aziz.campusmarket.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    @Override
    public Wishlist createWishlist(User user) {

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);

        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishlistByUserId(User user) {
        Wishlist wishlist =  wishlistRepository.findByUserId(user.getId());

        if (wishlist == null) {
            wishlist = createWishlist(user);
        }
        return wishlist;
    }

    @Override
    public Wishlist addProductToWishlist(User user, Product product) {

        Wishlist wishlist = getWishlistByUserId(user);

        if (wishlist.getProducts().contains(product)) {
            wishlist.getProducts().remove(product);
        }
        else wishlist.getProducts().add(product);

        return wishlistRepository.save(wishlist);
    }
}
