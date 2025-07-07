package com.aziz.campusmarket.modal;

import com.aziz.campusmarket.domain.AccountStatus;
import com.aziz.campusmarket.domain.USER_ROLE;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String sellerName;

    private String mobile;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;

    private String preferredName;

    @Embedded
    private BankDetails bankDetails = new BankDetails();

    // A seller has one pickup address
    @OneToOne(cascade = CascadeType.ALL)
    private Address pickupaddress = new Address();

    private String fiscalCode;

    private USER_ROLE role = USER_ROLE.ROLE_SELLER;

    private  boolean isEmailVerified = false;

    private AccountStatus accountStatus = AccountStatus.ACTIVE;


}

