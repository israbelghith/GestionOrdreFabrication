package com.example.gestionfabrication.controllers;

import com.example.gestionfabrication.dto.OrdreFabricationDTO;
import com.example.gestionfabrication.entities.OrdreFabrication;
import com.example.gestionfabrication.services.OrdreFabricationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Map;

@RestController
@RequestMapping("/api/ordresFabrications")
@CrossOrigin(origins = "http://localhost:4200")
public class OrdreFabricationController {

	 @Autowired
	    private OrdreFabricationService ordreFabricationService;

	   
	    @PostMapping
	    public OrdreFabricationDTO createOrdreFabrication(@RequestBody OrdreFabrication ordreFabrication) {
	        return ordreFabricationService.createOrdre(ordreFabrication);
	    }

	   
	    @GetMapping("/allOrdres")
	    public List<OrdreFabricationDTO> getAllOrdresFabrication() {
	        return ordreFabricationService.getAllOrdres();
	    }

	    
	    @GetMapping("/{id}")
	    public OrdreFabricationDTO getOrdreFabricationById(@PathVariable Long id) {
	        return ordreFabricationService.getOrdreById(id);
	    }

	    
	    @PutMapping("/{id}")
	    public OrdreFabricationDTO updateOrdreFabrication(@PathVariable Long id, @RequestBody OrdreFabrication ordreFabrication) {
	        return ordreFabricationService.updateOrdreFabrication(id, ordreFabrication);
	    }

	    
	    @DeleteMapping("/{id}")
	    public void deleteOrdreFabrication(@PathVariable Long id) {
	        ordreFabricationService.deleteOrdre(id);
	    }

	    
	    @GetMapping("/statut/{statut}")
	    public List<OrdreFabricationDTO> getOrdresParStatut(@PathVariable String statut) {
	        return ordreFabricationService.getOrdresParStatut(statut);
	    }

	    
	    @PutMapping("/{ordreId}/affectation")
	    public OrdreFabricationDTO affecterMachineEtEmploye(
	            @PathVariable Long ordreId,
	            @RequestBody Map<String, Long> body) {
	        
	        Long employeId = body.get("employeId");
	        Long machineId = body.get("machineId");

	        return ordreFabricationService.affecterMachineEtEmploye(ordreId, employeId, machineId);
	    }
	    @GetMapping("/recherche")
	    public List<OrdreFabricationDTO> rechercherMultiCritere(
	            @RequestParam(required = false) String statut,
	            @RequestParam(required = false) String produit,
	            @RequestParam(required = false) String employe,
	            @RequestParam(required = false) String machine) {

	        return ordreFabricationService.rechercherMultiCritere(statut, produit, employe, machine);
	    }

	    @GetMapping("/machine/{id}/occupee")
	    public boolean isMachineOccupee(
	            @PathVariable("id") Long machineId,
	            @RequestParam("debut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateDebut,
	            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFin
	    ) {
	        return ordreFabricationService.estMachineOccupeePendantPeriode(machineId, dateDebut, dateFin);
	    }
	    
	}