package com.aziz.campusmarket.service.impl;

import com.aziz.campusmarket.config.JwtProvider;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.repository.UserRepository;
import com.aziz.campusmarket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(jwt);

        User user = this.findUserByEmail(email);

        if (user == null) {
            throw new Exception("User with email : " + email + " not found");
        }

        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User with email : " + email + " not found");
        }
        return user;
    }
}

