package com.example.banking.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class Contact extends AbstractEntity {

    private String firstname;
    private String lastname;
    private String email;
    private String iban;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
