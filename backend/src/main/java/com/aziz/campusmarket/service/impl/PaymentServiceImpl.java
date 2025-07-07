package com.aziz.campusmarket.service.impl;

import com.aziz.campusmarket.domain.PaymentOrderStatus;
import com.aziz.campusmarket.modal.Order;
import com.aziz.campusmarket.modal.PaymentOrder;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.repository.OrderRepository;
import com.aziz.campusmarket.repository.PaymentOrderRepository;
import com.aziz.campusmarket.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private PaymentOrderRepository paymentOrderRepository;
    private OrderRepository orderRepository;

    private String stripeSecretKey ="stripesecretkey";


    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {

        Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {

        return paymentOrderRepository.findById(orderId).orElseThrow(
                () -> new Exception("Order not found")
        );
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception {

        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(paymentId);

        if (paymentOrder == null) {
            throw new Exception(("Payment order not found"));
        }

        return paymentOrder;
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) {

        Stripe.apiKey = stripeSecretKey;

        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            try {
                // Confirm the payment intent
                PaymentIntentConfirmParams params = PaymentIntentConfirmParams.builder().build();
                PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentId);
                paymentIntent = paymentIntent.confirm(params);

                // Check if the payment was successful
                if ("succeeded".equals(paymentIntent.getStatus())) {
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS); // Update status to completed
                    return true;
                } else {
                    paymentOrder.setStatus(PaymentOrderStatus.FAILED); // Update status to failed if not succeeded
                }
            } catch (StripeException e) {
                e.printStackTrace();
                paymentOrder.setStatus(PaymentOrderStatus.FAILED); // Set status to failed if an error occurs
            }
        }

        return false; // Return false if the payment was not successful
    }

    @Override
    public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {

        Stripe.apiKey = stripeSecretKey;
        SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(SessionCreateParams
                        .PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost3000/payment-success/" + orderId)
                .setCancelUrl("http://localhost3000/payment-cancelled/" + orderId)
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("eur")
                                .setUnitAmount(amount * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                        .builder().setName("Aziz Payment").build()
                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        return session.getUrl();
    }
}
