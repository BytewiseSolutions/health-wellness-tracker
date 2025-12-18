package com.healthtracker.api.fitness;

import com.healthtracker.api.common.Base;
import com.healthtracker.api.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

@Entity
@Table(name = "fitness_activities")
@Data
@EqualsAndHashCode(callSuper = true)
public class FitnessActivity extends Base {
    @NotBlank
    private String activityType;

    @NotNull
    private Integer duration;

    private Integer caloriesBurned;

    @Column(name = "activity_date")
    private LocalDateTime activityDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        if (activityDate == null) {
            activityDate = LocalDateTime.now();
        }
    }
}