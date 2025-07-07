package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Product;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.modal.Wishlist;

public interface WishlistService {

    Wishlist createWishlist(User user);
    Wishlist getWishlistByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product);
}
