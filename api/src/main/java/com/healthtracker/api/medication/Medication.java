package com.healthtracker.api.medication;

import com.healthtracker.api.common.Base;
import com.healthtracker.api.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalTime;

@Entity
@Table(name = "medications")
@Data
@EqualsAndHashCode(callSuper = true)
public class Medication extends Base {
    @NotBlank
    private String name;

    @NotBlank
    private String dosage;

    @NotNull
    private LocalTime reminderTime;

    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}