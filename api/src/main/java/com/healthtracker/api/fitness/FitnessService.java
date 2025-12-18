package com.healthtracker.api.fitness;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FitnessService {

    @Autowired
    private FitnessRepository fitnessRepository;

    public List<FitnessActivity> getUserActivities(Long userId) {
        return fitnessRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public FitnessActivity saveActivity(FitnessActivity activity) {
        return fitnessRepository.save(activity);
    }

    public Map<String, Object> getUserStats(Long userId) {
        List<FitnessActivity> activities = getUserActivities(userId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActivities", activities.size());
        stats.put("totalSteps", 0);
        stats.put("totalCalories", activities.stream().mapToInt(a -> a.getCaloriesBurned() != null ? a.getCaloriesBurned() : 0).sum());
        stats.put("totalDuration", activities.stream().mapToInt(a -> a.getDuration() != null ? a.getDuration() : 0).sum());
        
        return stats;
    }
}