package com.healthtracker.api.fitness;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FitnessRepository extends JpaRepository<FitnessActivity, Long> {
    List<FitnessActivity> findByUserIdOrderByActivityDateDesc(Long userId);
}