package com.aziz.campusmarket.modal;

import lombok.Data;

import java.util.List;

@Data
public class Home {

    private List<HomeCategory> grid;
    private List<HomeCategory> shopByCategory;
    private List<HomeCategory> electronicCategory;
    private List<HomeCategory> dealsCategories;

    private List<Deal> deals;
}
