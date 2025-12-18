package com.healthtracker.api.mood;

import com.healthtracker.api.common.Base;
import com.healthtracker.api.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

@Entity
@Table(name = "mood_entries")
@Data
@EqualsAndHashCode(callSuper = true)
public class MoodEntry extends Base {
    @NotNull
    @Min(1)
    @Max(10)
    private Integer moodLevel;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer stressLevel;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "entry_date")
    private LocalDateTime entryDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        if (entryDate == null) {
            entryDate = LocalDateTime.now();
        }
    }
}