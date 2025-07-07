package com.aziz.campusmarket.service;

import com.aziz.campusmarket.exceptions.ProductException;
import com.aziz.campusmarket.modal.Product;
import com.aziz.campusmarket.modal.Seller;
import com.aziz.campusmarket.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    public Product createProduct(CreateProductRequest req, Seller seller);
    public void deleteProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId, Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> searchProducts(String query);
    public Product updateProductStock(Long productId)throws ProductException;
    public Page<Product> getAllProducts(
            String category,
            String brand,
            String colors,
            String sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber
    );
    public List<Product> recentlyAddedProduct();
    List<Product> getProductBySellerId(Long sellerId);
}
