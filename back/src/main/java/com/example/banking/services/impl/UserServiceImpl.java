package com.example.banking.services.impl;

import com.example.banking.config.JwtUtils;
import com.example.banking.dto.AccountDto;
import com.example.banking.dto.AuthenticationRequest;
import com.example.banking.dto.AuthenticationResponse;
import com.example.banking.dto.UserDto;
import com.example.banking.models.Account;
import com.example.banking.models.Role;
import com.example.banking.models.User;
import com.example.banking.repositories.AccountRepository;
import com.example.banking.repositories.RoleRepository;
import com.example.banking.repositories.UserRepository;
import com.example.banking.services.AccountService;
import com.example.banking.services.UserService;
import com.example.banking.validators.ObjectsValidators;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final static String ROLE_USER = "ROLE_USER";
    private final UserRepository repository;
    private final ObjectsValidators<UserDto> validators;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;

    @Override
    public Integer save(UserDto dto) {
        validators.validate(dto);
        User user = UserDto.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user).getId();
    }

    @Override
    public List<UserDto> findAll() {
        return repository.findAll()
                .stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto findById(Integer id) {
        return repository.findById(id)
                .map(UserDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No user was found"));
    }

    @Override
    public void delete(Integer id) {
        //todo check before
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public Integer validateAccount(Integer id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No user was found"));

        if(user.getAccount() == null) {
            //create an account
            AccountDto accountDto = AccountDto.builder()
                    .user(UserDto.fromEntity(user))
                    .build();
            var savedAccount = accountService.save(accountDto);
            user.setAccount(Account
                    .builder()
                    .id(savedAccount)
                    .build());
        }

        user.setActive(true);
        repository.save(user);
        return user.getId();
    }

    @Override
    public Integer inValidateAccount(Integer id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No user was found"));

        //delete account
//        Account account = accountRepository.findByUserId(user.getId())
//                .orElseThrow(() -> new EntityNotFoundException("No account was found"));
//        accountService.delete(account.getId());

        user.setActive(false);
        repository.save(user);
        return user.getId();
    }

    @Override
    @Transactional
    public AuthenticationResponse register(UserDto userDto) {
        validators.validate(userDto);
        User user = UserDto.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(findOrCreateRole(ROLE_USER));
        var savedUser = repository.save(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", savedUser.getId());
        claims.put("fullName", savedUser.getFirstname() + " " + savedUser.getLastname());
        String token = jwtUtils.generateToken(savedUser, claims);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        final User user = repository.findByEmail(request.getEmail()).get();
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("fullName", user.getFirstname() + " " + user.getLastname());
        final String token = jwtUtils.generateToken(user, claims);
        return AuthenticationResponse.builder().token(token).build();
    }

    private Role findOrCreateRole(String roleName) {
        Role role = roleRepository.findByName(roleName).orElse(null);
        if (role == null) {
            return roleRepository.save(Role.builder().name(roleName).build());
        }
        return role;
    }
}
