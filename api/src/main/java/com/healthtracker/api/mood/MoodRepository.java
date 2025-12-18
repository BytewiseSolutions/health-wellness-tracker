package com.healthtracker.api.mood;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoodRepository extends JpaRepository<MoodEntry, Long> {
    List<MoodEntry> findByUserIdOrderByCreatedAtDesc(Long userId);
}