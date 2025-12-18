package com.healthtracker.api.common;

import com.healthtracker.api.user.User;
import com.healthtracker.api.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userRepository.existsByEmail("lebohang@bsc.africa")) {
            User admin = new User();
            admin.setFirstName("Lebohang");
            admin.setLastName("Monamane");
            admin.setEmail("lebohang@bsc.africa");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setPhoneNumber("59181664");
            admin.setVillage("Pitseng");
            admin.setCity("Leribe");
            admin.setCountry("Lesotho");
            admin.setStatus(Status.ACTIVE);
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);
            System.out.println("Default admin user created: lebohang@bsc.africa / password");
        }
    }
}