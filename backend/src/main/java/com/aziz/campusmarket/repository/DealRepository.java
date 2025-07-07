package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.modal.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<Deal, Long> {
}
