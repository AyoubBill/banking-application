package com.example.banking.dto;

import com.example.banking.models.User;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserDto {

    private Integer id;

    @NotNull(message = "Le firstname ne doit pas etre null")
    @NotBlank(message = "Le firstname ne doit pas etre vide")
    @NotEmpty(message = "Le firstname ne doit pas etre vide")
    private String firstname;

    @NotNull(message = "Le prenom ne doit pas etre null")
    @NotBlank(message = "Le prenom ne doit pas etre vide")
    @NotEmpty(message = "Le prenom ne doit pas etre vide")
    private String lastname;

    @NotNull(message = "Le e-mail ne doit pas etre null")
    @NotBlank(message = "Le e-mail ne doit pas etre vide")
    @NotEmpty(message = "Le e-mail ne doit pas etre vide")
    @Email(message = "Le e-mail n'est pas valid")
    private String email;

    @NotNull(message = "Le password ne doit pas etre null")
    @NotBlank(message = "Le password ne doit pas etre vide")
    @NotEmpty(message = "Le password ne doit pas etre vide")
    @Size(min = 8, max = 16)
    private String password;

    private String iban;
    private boolean active;

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(user.getPassword())
                .iban(user.getAccount() == null ? "" : user.getAccount().getIban())
                .active(user.isActive())
                .build();
    }

    public static User toEntity(UserDto userDto) {
        return User.builder()
                .id(userDto.getId())
                .firstname(userDto.getFirstname())
                .lastname(userDto.getLastname())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .active(userDto.isActive())
                .build();
    }
}
