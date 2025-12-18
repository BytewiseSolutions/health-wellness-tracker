package com.healthtracker.api.user;

import com.healthtracker.api.common.Status;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String village;
    private String city;
    private String country;
    private Status status;
}