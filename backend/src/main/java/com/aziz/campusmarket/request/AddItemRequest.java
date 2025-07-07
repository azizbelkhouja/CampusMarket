package com.aziz.campusmarket.request;

import lombok.Data;

@Data
public class AddItemRequest {

    private String size;
    private int quantity;
    private Long productId;
    private Integer price;
}
