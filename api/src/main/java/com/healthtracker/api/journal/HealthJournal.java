package com.healthtracker.api.journal;

import com.healthtracker.api.common.Base;
import com.healthtracker.api.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "health_journals")
@Data
@EqualsAndHashCode(callSuper = true)
public class HealthJournal extends Base {
    @NotBlank
    private String title;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}