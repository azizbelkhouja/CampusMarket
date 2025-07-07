package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Home;
import com.aziz.campusmarket.modal.HomeCategory;

import java.util.List;

public interface HomeService {

    Home createHomePageData(List<HomeCategory> categories);
}
