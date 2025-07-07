package com.aziz.campusmarket.modal;

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
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Each user has one wishlist
    @OneToOne
    private User user;

    // A wishlist can contain multiple products
    @ManyToMany
    private Set<Product> products = new HashSet<>();
}

