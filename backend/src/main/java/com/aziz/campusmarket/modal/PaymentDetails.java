package com.aziz.campusmarket.modal;

import com.aziz.campusmarket.domain.PaymentStatus;
import lombok.Data;

@Data
public class PaymentDetails {

    private String paymentId;
    private String stripePaymentLinkId;
    private String stripePaymentLinkReferenceId;
    private String stripePaymentLinkStatus;
    private String stripePaymentIdZWSP;
    private PaymentStatus status;
}
