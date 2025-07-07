package com.aziz.campusmarket.controller;

import com.aziz.campusmarket.domain.USER_ROLE;
import com.aziz.campusmarket.modal.VerificationCode;
import com.aziz.campusmarket.request.LoginOtpRequest;
import com.aziz.campusmarket.request.LoginRequest;
import com.aziz.campusmarket.request.SignupRequest;
import com.aziz.campusmarket.response.ApiResponse;
import com.aziz.campusmarket.response.AuthResponse;
import com.aziz.campusmarket.service.AuthService;
import jakarta.mail.MessagingException;
import jdk.jshell.spi.ExecutionControl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {

        String jwt = authService.createUser(req);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Registered Successfully");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sentLoginOtp(
            @RequestBody VerificationCode req) throws Exception {

        authService.sendOtp(req.getEmail());

        ApiResponse res = new ApiResponse();
        res.setMessage("otp sent");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> LoginHandler(@RequestBody LoginRequest req) throws Exception {

        AuthResponse authResponse = authService.signin(req);

        return ResponseEntity.ok(authResponse);
    }
}
