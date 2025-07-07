package com.aziz.campusmarket.service.impl;

import com.aziz.campusmarket.domain.USER_ROLE;
import com.aziz.campusmarket.modal.Seller;
import com.aziz.campusmarket.modal.User;
import com.aziz.campusmarket.repository.SellerRepository;
import com.aziz.campusmarket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomUserServiceImpl implements UserDetailsService {


    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    // check in seller table if seller_ prefix is in the name
    private static final String SELLER_PREFIX = "Seller_";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (username.startsWith(SELLER_PREFIX)) {
            String actualUsername = username.substring(SELLER_PREFIX.length());
            Seller seller = sellerRepository.findByEmail(actualUsername);

            if (seller != null) {
                return buildUserDetails(seller.getEmail(), seller.getPassword(), seller.getRole());
            }
        } else {
            User user = userRepository.findByEmail(username);
            if (user != null) {
                return buildUserDetails(user.getEmail(), user.getPassword(), user.getRole());
            }
        }

        throw new UsernameNotFoundException(username + " email not found");
    }

    private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {

        if(role == null) role = USER_ROLE.ROLE_CUSTOMER;

        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(role.toString()));

        return new org.springframework.security.core.userdetails.User (
                email,
                password,
                authorityList
        );

    }
}
