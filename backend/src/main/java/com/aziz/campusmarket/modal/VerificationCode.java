package com.aziz.campusmarket.modal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class VerificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String otp;

    private String email;

    // A verification code can be associated with one user
    @OneToOne
    private User user;

    // A verification code can be associated with one seller
    @OneToOne
    private Seller seller;
}
