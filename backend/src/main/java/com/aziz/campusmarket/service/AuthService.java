package com.aziz.campusmarket.service;

import com.aziz.campusmarket.domain.USER_ROLE;
import com.aziz.campusmarket.request.LoginRequest;
import com.aziz.campusmarket.request.SignupRequest;
import com.aziz.campusmarket.response.AuthResponse;

public interface AuthService {

    void sendOtp(String email) throws Exception;

    String createUser(SignupRequest req) throws Exception;

    AuthResponse signin(LoginRequest req) throws Exception;
}
