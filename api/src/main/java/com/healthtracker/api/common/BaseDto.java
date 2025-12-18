package com.healthtracker.api.common;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public abstract class BaseDto {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}