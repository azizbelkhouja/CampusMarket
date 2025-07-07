package com.aziz.campusmarket.modal;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User customer;

    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sentAt;

    private boolean readStatus;

}
