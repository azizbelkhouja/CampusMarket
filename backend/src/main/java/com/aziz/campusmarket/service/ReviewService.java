package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Product;
import com.aziz.campusmarket.modal.Review;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewRequest req,
                        User user,
                        Product product
    );

    List<Review> getReviewByProductId(Long productId);
    Review updateReview(Long reviewId, String reviewText, double reviewRating, Long userId) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;
    Review getReviewById(Long reviewId) throws Exception;
}
