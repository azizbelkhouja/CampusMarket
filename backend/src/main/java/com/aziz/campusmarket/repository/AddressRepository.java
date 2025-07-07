package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.modal.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
