package com.aziz.campusmarket.service.impl;

import com.aziz.campusmarket.modal.Product;
import com.aziz.campusmarket.modal.Review;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.repository.ReviewRepository;
import com.aziz.campusmarket.request.CreateReviewRequest;
import com.aziz.campusmarket.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImages());

        product.getReviews().add(review);

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double reviewRating, Long userId) throws Exception {

        Review review = getReviewById(reviewId);

        if (review.getUser().getId().equals(userId)) {
            review.setReviewText(reviewText);
            review.setRating(reviewRating);
            return reviewRepository.save(review);
        }
        throw new Exception("you can't update this review");

    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);

        if (review.getUser().getId().equals(userId)) {
            throw new Exception("You can't delete this review");
        }

        reviewRepository.delete(review);
    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId).orElseThrow(()->
                new Exception("Review not found"));
    }
}
