package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Seller;
import com.aziz.campusmarket.modal.SellerReport;

public interface SellerReportService {

    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
