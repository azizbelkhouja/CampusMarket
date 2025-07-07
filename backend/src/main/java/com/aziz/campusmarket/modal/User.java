package com.aziz.campusmarket.modal;

import com.aziz.campusmarket.modal.Address;
import com.aziz.campusmarket.modal.Coupon;
import com.aziz.campusmarket.domain.USER_ROLE;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // generate Id automatically ( no id from frontend when new user created )
    private Long id;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // password will not come when we fetch, pw must be secret
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String fullName;

    private String mobile;

    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

    // One-to-Many with Address: A user can have multiple addresses
    @OneToMany
    // address will be saved in db
    private Set<Address> addresses = new HashSet<>();

    // Many-to-Many with Coupon: Users can use multiple coupons, and a coupon can be used by multiple users
    @ManyToMany
    // we don't need coupons in frontend, data needed only backend to check if coupon is valid or not
    @JsonIgnore
    // each user can use a coupon only one time
    private Set<Coupon> usedCoupons = new HashSet<>();

}
