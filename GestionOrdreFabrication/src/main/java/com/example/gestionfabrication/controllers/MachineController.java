package com.example.gestionfabrication.controllers;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionfabrication.dto.MachineDTO;
import com.example.gestionfabrication.entities.Machine;
import com.example.gestionfabrication.services.MachineService;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin("*")
public class MachineController {

	@Autowired
    private MachineService machineService;

	@PostMapping
    public MachineDTO createMachine(@RequestBody Machine machine) {
        return machineService.createMachine(machine);
    }

	    @GetMapping("/allMachines")
	    public List<MachineDTO> getAllMachines() {
	        return machineService.getAllMachines();
	    }

	    @GetMapping("/{id}")
	    public MachineDTO getMachineById(@PathVariable Long id) {
	        return machineService.getMachineById(id);
	    }

	    @PutMapping("/{id}")
	    public MachineDTO updateMachine(@PathVariable Long id, @RequestBody Machine machine) {
	        
	            return machineService.updateMachine(id, machine); 
	    }

	    @DeleteMapping("/{id}")
	    public void deleteMachine(@PathVariable Long id) {
	        machineService.deleteMachine(id);
	    }

	    @PutMapping("/{id}/maintenance")
	    public MachineDTO mettreAJourMaintenance(@PathVariable Long id, @RequestBody Machine machine) {
	        return machineService.mettreAJourMaintenance(id, machine);
	    }
	    
	    @GetMapping("/disponibles")
	    public List<MachineDTO> getMachinesDisponibles(
	        @RequestParam("debut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime debut,
	        @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
	        return machineService.findDisponibles(debut, fin);
	    }

	    @PutMapping("/{id}/activer")
	    public MachineDTO activerMachineSiMaintenanceTerminee(@PathVariable Long id) {
	    	
	    	return machineService.activerMachine(id); 
	       
	    }

}