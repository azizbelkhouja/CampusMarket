package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.domain.AccountStatus;
import com.aziz.campusmarket.modal.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);
}
