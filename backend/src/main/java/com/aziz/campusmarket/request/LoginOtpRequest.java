package com.aziz.campusmarket.request;

import com.aziz.campusmarket.domain.USER_ROLE;
import lombok.Data;

@Data
public class LoginOtpRequest {

    private String email;
    private String otp;
    private USER_ROLE role;
}
