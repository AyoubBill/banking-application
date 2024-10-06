package com.example.banking.services.impl;

import com.example.banking.dto.AddressDto;
import com.example.banking.dto.UserDto;
import com.example.banking.models.Address;
import com.example.banking.repositories.AddressRepository;
import com.example.banking.repositories.UserRepository;
import com.example.banking.services.AddressService;
import com.example.banking.validators.ObjectsValidators;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository repository;
    private final ObjectsValidators<AddressDto> validators;

    @Override
    public Integer save(AddressDto dto) {
        validators.validate(dto);
        Address address = AddressDto.toEntity(dto);
        return repository.save(address).getId();
    }

    @Override
    public List<AddressDto> findAll() {
        return repository.findAll()
                .stream()
                .map(AddressDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public AddressDto findById(Integer id) {
        return repository.findById(id)
                .map(AddressDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No address was found"));
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
