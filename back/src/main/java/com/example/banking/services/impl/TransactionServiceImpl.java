package com.example.banking.services.impl;

import com.example.banking.dto.TransactionDto;
import com.example.banking.models.Transaction;
import com.example.banking.models.TransactionType;
import com.example.banking.repositories.TransactionRepository;
import com.example.banking.services.TransactionService;
import com.example.banking.validators.ObjectsValidators;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;
    private final ObjectsValidators<TransactionDto> validators;

    @Override
    public Integer save(TransactionDto dto) {
        validators.validate(dto);
        Transaction transaction = TransactionDto.toEntity(dto);
        BigDecimal transactionMultiplyer = BigDecimal.valueOf(getTransactionType(transaction.getType()));
        BigDecimal amount = transaction.getAmount().multiply(transactionMultiplyer);
        transaction.setAmount(amount);
        return repository.save(transaction).getId();
    }

    @Override
    public List<TransactionDto> findAll() {
        return repository.findAll()
                .stream()
                .map(TransactionDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDto findById(Integer id) {
        return repository.findById(id)
                .map(TransactionDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No transaction was found"));
    }

    @Override
    public void delete(Integer id) {
        //todo check exists transaction
        repository.deleteById(id);
    }

    private int getTransactionType(TransactionType type) {
        return TransactionType.TRANSFERT == type ? -1: 1;
    }

    @Override
    public List<TransactionDto> findAllByUserId(Integer userId) {
        return repository.findAllByUserId(userId)
                .stream()
                .map(TransactionDto::fromEntity)
                .collect(Collectors.toList());
    }
}
