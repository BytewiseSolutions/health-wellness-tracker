package com.healthtracker.api.user;

import com.healthtracker.api.common.Base;
import com.healthtracker.api.common.Role;
import com.healthtracker.api.common.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends Base {
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String phoneNumber;

    private String village;

    private String city;

    private String country;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
}