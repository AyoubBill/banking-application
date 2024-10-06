package com.example.banking.services.impl;

import com.example.banking.dto.ContactDto;
import com.example.banking.dto.UserDto;
import com.example.banking.models.Contact;
import com.example.banking.repositories.AddressRepository;
import com.example.banking.repositories.ContactRepository;
import com.example.banking.repositories.UserRepository;
import com.example.banking.services.ContactService;
import com.example.banking.validators.ObjectsValidators;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository repository;
    private final ObjectsValidators<ContactDto> validators;

    @Override
    public Integer save(ContactDto dto) {
        validators.validate(dto);
        Contact contact = ContactDto.toEntity(dto);
        return repository.save(contact).getId();
    }

    @Override
    public List<ContactDto> findAll() {
        return repository.findAll()
                .stream()
                .map(ContactDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public ContactDto findById(Integer id) {
        return repository.findById(id)
                .map(ContactDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No contact was found"));
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<ContactDto> findAllByUserId(Integer userId) {
        return repository.findAllByUserId(userId)
                .stream()
                .map(ContactDto::fromEntity)
                .collect(Collectors.toList());
    }
}
