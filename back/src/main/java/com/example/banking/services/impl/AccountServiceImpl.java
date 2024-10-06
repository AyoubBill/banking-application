package com.example.banking.services.impl;

import com.example.banking.dto.AccountDto;
import com.example.banking.exception.OperationNonPermittedException;
import com.example.banking.models.Account;
import com.example.banking.repositories.AccountRepository;
import com.example.banking.services.AccountService;
import com.example.banking.validators.ObjectsValidators;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.iban4j.CountryCode;
import org.iban4j.Iban;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repository;
    private final ObjectsValidators<AccountDto> validators;

    @Override
    public Integer save(AccountDto dto) {
        //iban cannot be changed
//        if(dto.getId() != null) {
//            throw new OperationNonPermittedException(
//                "Account cannot be updated",
//                "Save accout",
//                "Account",
//                "Update not permitted"
//            );
//        }
        validators.validate(dto);
        Account account = AccountDto.toEntity(dto);
        boolean userHasAnAccount = repository.findByUserId(account.getUser().getId()).isPresent();
        if (userHasAnAccount && account.getUser().isActive()) {
            throw new OperationNonPermittedException(
                    "The selected user has an account",
                    "Create account",
                    "Account Service",
                    "Account creation"
            );
        }

        //generate random IBAN
        if (dto.getId() == null) {
            account.setIban(generateRandomIban());
        }

        return repository.save(account).getId();
    }

    @Override
    public List<AccountDto> findAll() {
        return repository.findAll()
                .stream()
                .map(AccountDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public AccountDto findById(Integer id) {
        return repository.findById(id)
                .map(AccountDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No account was found"));
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    private String generateRandomIban() {
        //generate an IBAN
        String iban = Iban.random(CountryCode.DE).toFormattedString();

        //check if iban already exists
        boolean ibanExists = repository.findByIban(iban).isPresent();

        //if exists -> generate new random iban
        if(ibanExists) {
            generateRandomIban();
        }

        //if not exists -> return generated iban
        return iban;
    }
}
