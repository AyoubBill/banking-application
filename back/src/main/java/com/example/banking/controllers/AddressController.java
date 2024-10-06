package com.example.banking.controllers;

import com.example.banking.dto.AddressDto;
import com.example.banking.services.AddressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
@Tag(name = "address")
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/")
    public ResponseEntity<Integer> save(@RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(addressService.save(addressDto));
    }

    @GetMapping("/")
    public ResponseEntity<List<AddressDto>> findAll() {
        return ResponseEntity.ok(addressService.findAll());
    }

    @GetMapping("/{address-id}")
    public ResponseEntity<AddressDto> findById(@PathVariable("address-id") Integer addressId) {
        return ResponseEntity.ok(addressService.findById(addressId));
    }

    @DeleteMapping("/delete/{address-id}")
    public ResponseEntity<Void> delete(@PathVariable("address-id") Integer addressId) {
        addressService.delete(addressId);
        return ResponseEntity.accepted().build();
    }

}
