package com.aziz.campusmarket.repository;

import com.aziz.campusmarket.modal.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryId(String CategoryId);
}