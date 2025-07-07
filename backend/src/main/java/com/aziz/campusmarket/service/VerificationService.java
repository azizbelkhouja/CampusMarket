package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.VerificationCode;

public interface VerificationService {

    VerificationCode createVerificationCode(String otp, String email);
}
