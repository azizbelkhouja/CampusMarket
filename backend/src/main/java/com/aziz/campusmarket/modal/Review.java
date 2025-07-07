package com.aziz.campusmarket.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String reviewText;

    private double rating;

    @ElementCollection
    private List<String> productImages;

    @JsonIgnore
    // A review is for one product
    @ManyToOne
    @NotNull
    private Product product;

    // A review is written by one user
    @ManyToOne
    @NotNull
    private User user;

    @Column(nullable = false)
    private LocalDateTime createdAt= LocalDateTime.now();

}
