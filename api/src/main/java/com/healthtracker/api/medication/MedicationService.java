package com.healthtracker.api.medication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MedicationService {

    @Autowired
    private MedicationRepository medicationRepository;

    public List<Medication> getUserMedications(Long userId) {
        return medicationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Medication saveMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    public Map<String, Object> getMedicationStats(Long userId) {
        List<Medication> medications = getUserMedications(userId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalMedications", medications.size());
        stats.put("activeMedications", medications.stream().filter(m -> m.isActive()).count());
        
        return stats;
    }
}