package com.example.banking.repositories;

import com.example.banking.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByIban(String iban);

    Optional<Account> findByUserId(Integer id);

//    @Query(value = "DELETE FROM account WHERE id=:userId", nativeQuery = true)
//    void deleteByUserId(@Param("userId") Integer userId);
}
