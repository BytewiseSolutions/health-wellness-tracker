package com.healthtracker.api.mood;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MoodService {

    @Autowired
    private MoodRepository moodRepository;

    public List<MoodEntry> getUserMoods(Long userId) {
        return moodRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public MoodEntry saveMood(MoodEntry mood) {
        return moodRepository.save(mood);
    }

    public Map<String, Object> getMoodStats(Long userId) {
        List<MoodEntry> moods = getUserMoods(userId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEntries", moods.size());
        
        Map<String, Long> moodCounts = new HashMap<>();
        moods.forEach(mood -> {
            String moodLevel = convertMoodLevel(mood.getMoodLevel());
            moodCounts.put(moodLevel, moodCounts.getOrDefault(moodLevel, 0L) + 1);
        });
        stats.put("moodDistribution", moodCounts);
        
        return stats;
    }

    private String convertMoodLevel(Integer level) {
        if (level >= 8) return "GREAT";
        if (level >= 6) return "GOOD";
        if (level >= 4) return "OKAY";
        return "LOW";
    }
}