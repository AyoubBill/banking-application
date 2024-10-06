package com.example.banking.controllers;

import com.example.banking.dto.TransactionSumDetails;
import com.example.banking.services.StatisticsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
@Tag(name = "statistic")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/sum-by-date/{user-id}")
    public ResponseEntity<List<TransactionSumDetails>> findSumTransactionsByDate(
            @PathVariable("user-id") Integer userId,
            @RequestParam("start-date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam("end-date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok(statisticsService.findSumTransactionsByDate(startDate, endDate, userId));
    }

    @GetMapping("/account-balance/{user-id}")
    public ResponseEntity<BigDecimal> getAccountBalance(@PathVariable("user-id") Integer userId) {
        return ResponseEntity.ok(statisticsService.getAccountBalance(userId));
    }

    @GetMapping("/highest-transfer/{user-id}")
    public ResponseEntity<BigDecimal> highestTransfert(@PathVariable("user-id") Integer userId) {
        return ResponseEntity.ok(statisticsService.highestTransfer(userId));
    }

    @GetMapping("/highest-deposit/{user-id}")
    public ResponseEntity<BigDecimal> highestDeposit(@PathVariable("user-id") Integer userId) {
        return ResponseEntity.ok(statisticsService.highestDeposit(userId));
    }

}
