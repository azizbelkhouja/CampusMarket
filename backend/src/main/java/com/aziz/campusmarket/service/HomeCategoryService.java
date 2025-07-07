package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.HomeCategory;

import java.util.List;

public interface HomeCategoryService {

    HomeCategory createCategory(HomeCategory categories);
    List<HomeCategory> createCategories(List<HomeCategory> categories);
    List<HomeCategory> getAllHomeCategories();
    HomeCategory updateHomeCategory(HomeCategory categories, Long id) throws Exception;
}
