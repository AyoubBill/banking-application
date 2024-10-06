package com.example.banking.services;

import com.example.banking.dto.ContactDto;

import java.util.List;

public interface ContactService extends AbstractService<ContactDto> {

    List<ContactDto> findAllByUserId(Integer userId);

}
