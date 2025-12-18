package com.healthtracker.api.fitness;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fitness")
@CrossOrigin(origins = "*")
public class FitnessController {

    @Autowired
    private FitnessService fitnessService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FitnessActivity>> getUserActivities(@PathVariable Long userId) {
        List<FitnessActivity> activities = fitnessService.getUserActivities(userId);
        return ResponseEntity.ok(activities);
    }

    @PostMapping
    public ResponseEntity<FitnessActivity> createActivity(@RequestBody FitnessActivity activity) {
        FitnessActivity saved = fitnessService.saveActivity(activity);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<?> getUserStats(@PathVariable Long userId) {
        return ResponseEntity.ok(fitnessService.getUserStats(userId));
    }
}