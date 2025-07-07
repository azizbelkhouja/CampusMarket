package com.aziz.campusmarket.service;

import com.aziz.campusmarket.modal.Order;
import com.aziz.campusmarket.modal.Seller;
import com.aziz.campusmarket.modal.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
