package com.healthtracker.api.journal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalRepository extends JpaRepository<HealthJournal, Long> {
    List<HealthJournal> findByUserIdOrderByCreatedAtDesc(Long userId);
}