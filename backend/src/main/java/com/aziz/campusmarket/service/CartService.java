package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Cart;
import com.aziz.campusmarket.modal.CartItem;
import com.aziz.campusmarket.modal.Product;
import com.aziz.campusmarket.modal.User;

public interface CartService {

    public CartItem addCartItem(User user, Product product, String size, int quantity);
    public Cart findUserCart(User user);

}
