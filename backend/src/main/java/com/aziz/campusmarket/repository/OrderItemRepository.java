package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.modal.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {


}
