package com.healthtracker.api.user;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}