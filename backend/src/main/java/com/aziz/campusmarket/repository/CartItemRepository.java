package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.modal.Cart;
import com.aziz.campusmarket.modal.CartItem;
import com.aziz.campusmarket.modal.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
