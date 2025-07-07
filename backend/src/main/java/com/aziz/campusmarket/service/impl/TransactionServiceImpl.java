package com.aziz.campusmarket.service.impl;

import com.aziz.campusmarket.modal.Order;
import com.aziz.campusmarket.modal.Seller;
import com.aziz.campusmarket.modal.Transaction;
import com.aziz.campusmarket.repository.SellerRepository;
import com.aziz.campusmarket.repository.TransactionRepository;
import com.aziz.campusmarket.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final SellerRepository sellerRepository;

    @Override
    public Transaction createTransaction(Order order) {

        Seller seller = sellerRepository.findById(order.getSellerId()).get();

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionBySellerId(Seller seller) {

        return transactionRepository.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransactions() {

        return transactionRepository.findAll();
    }
}
