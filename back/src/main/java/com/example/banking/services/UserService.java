package com.example.banking.services;

import com.example.banking.dto.AuthenticationRequest;
import com.example.banking.dto.AuthenticationResponse;
import com.example.banking.dto.UserDto;

public interface UserService extends AbstractService<UserDto> {

    Integer validateAccount(Integer id);
    Integer inValidateAccount(Integer id);
    AuthenticationResponse register(UserDto userDto);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
