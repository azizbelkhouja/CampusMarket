package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.modal.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUserId(Long id);

}
