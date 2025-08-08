package com.example.demo.controller;

import com.example.demo.model.Candidate;
import com.example.demo.repository.CandidateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "http://localhost")
public class CandidateController {

    private final CandidateRepository candidateRepository;

    public CandidateController(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    // Health check endpoint
    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }

    // Create new candidate
    @PostMapping("/create")
    public Candidate createCandidate(@RequestBody Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    // Get all candidates
    @GetMapping("/list")
    public List<Candidate> getCandidates() {
        return candidateRepository.findAll();
    }

    // Update candidate by ID (body must include id)
    @PutMapping("/edit")
    public Candidate updateCandidate(@RequestBody Candidate updatedCandidate) {
        return candidateRepository.findById(updatedCandidate.getId())
                .map(candidate -> {
                    candidate.setName(updatedCandidate.getName());
                    candidate.setEmail(updatedCandidate.getEmail());
                    candidate.setPhone(updatedCandidate.getPhone());
                    return candidateRepository.save(candidate);
                })
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    // Delete candidate by ID
    @DeleteMapping("/delete/{id}")
    public void deleteCandidate(@PathVariable Long id) {
        candidateRepository.deleteById(id);
    }
}
