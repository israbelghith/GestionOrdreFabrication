package com.example.gestionfabrication.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.example.gestionfabrication.dto.EmployeDTO;
import com.example.gestionfabrication.entities.Employe;
import com.example.gestionfabrication.services.EmployeService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeController {

	@Autowired
	private EmployeService employeService;

	@PostMapping
	public EmployeDTO createEmploye(@RequestBody Employe employe) {
		return employeService.createEmploye(employe);
	}

	@GetMapping("/{id}")
	public EmployeDTO getEmployeById(@PathVariable Long id) {
		return employeService.getEmployeByIdDTO(id);
	}

	@GetMapping("/allEmployes")
	public List<EmployeDTO> getAllEmployesDTO() {
		return employeService.getAllEmployesDTO();
	}

	@PutMapping("/{id}")
	public EmployeDTO updateEmploye(@PathVariable Long id, @RequestBody Employe employe) {

		return employeService.updateEmploye(id, employe);

	}

	@DeleteMapping("/{id}")
	public void deleteEmploye(@PathVariable Long id) {
		employeService.deleteEmploye(id);
	}

	@GetMapping("/disponibles")
	public List<EmployeDTO> getEmployesDisponibles(
			@RequestParam("debut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime debut,
			@RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
		return employeService.findDisponibles(debut, fin);
	}

}