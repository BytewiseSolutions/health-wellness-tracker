package com.healthtracker.api.medication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medication")
@CrossOrigin(origins = "*")
public class MedicationController {

    @Autowired
    private MedicationService medicationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Medication>> getUserMedications(@PathVariable Long userId) {
        List<Medication> medications = medicationService.getUserMedications(userId);
        return ResponseEntity.ok(medications);
    }

    @PostMapping
    public ResponseEntity<Medication> createMedication(@RequestBody Medication medication) {
        Medication saved = medicationService.saveMedication(medication);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<?> getUserStats(@PathVariable Long userId) {
        return ResponseEntity.ok(medicationService.getMedicationStats(userId));
    }
}