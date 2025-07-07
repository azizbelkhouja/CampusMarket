package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.User;

public interface UserService {

    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
}
