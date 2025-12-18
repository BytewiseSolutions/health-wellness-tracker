package com.healthtracker.api.journal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalService {

    @Autowired
    private JournalRepository journalRepository;

    public List<HealthJournal> getUserEntries(Long userId) {
        return journalRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public HealthJournal saveEntry(HealthJournal entry) {
        return journalRepository.save(entry);
    }
}