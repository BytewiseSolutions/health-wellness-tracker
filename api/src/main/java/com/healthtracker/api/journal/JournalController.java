package com.healthtracker.api.journal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<HealthJournal>> getUserEntries(@PathVariable Long userId) {
        List<HealthJournal> entries = journalService.getUserEntries(userId);
        return ResponseEntity.ok(entries);
    }

    @PostMapping
    public ResponseEntity<HealthJournal> createEntry(@RequestBody HealthJournal entry) {
        HealthJournal saved = journalService.saveEntry(entry);
        return ResponseEntity.ok(saved);
    }
}