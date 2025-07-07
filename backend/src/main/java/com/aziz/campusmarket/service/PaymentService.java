package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Order;
import com.aziz.campusmarket.modal.PaymentOrder;
import com.aziz.campusmarket.modal.User;
import com.stripe.exception.StripeException;

import java.util.Set;

public interface PaymentService {

    PaymentOrder createOrder(User user, Set<Order> orders);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId);
    String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
