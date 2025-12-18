package com.healthtracker.api.mood;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mood")
@CrossOrigin(origins = "*")
public class MoodController {

    @Autowired
    private MoodService moodService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MoodEntry>> getUserMoods(@PathVariable Long userId) {
        List<MoodEntry> moods = moodService.getUserMoods(userId);
        return ResponseEntity.ok(moods);
    }

    @PostMapping
    public ResponseEntity<MoodEntry> createMood(@RequestBody MoodEntry mood) {
        MoodEntry saved = moodService.saveMood(mood);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<?> getUserStats(@PathVariable Long userId) {
        return ResponseEntity.ok(moodService.getMoodStats(userId));
    }
}