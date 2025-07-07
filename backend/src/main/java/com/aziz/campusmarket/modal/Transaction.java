package com.aziz.campusmarket.modal;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // A transaction is associated with one user ( customer )
    @ManyToOne
    private User customer;

    // A transaction corresponds to one order
    @OneToOne
    private Order order;

    // A transaction is associated with one seller
    @ManyToOne
    private Seller seller;

    //time when transaction is created
    private LocalDateTime date = LocalDateTime.now();
}
