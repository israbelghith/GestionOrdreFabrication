package com.example.gestionfabrication.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gestionfabrication.dto.EmployeDTO;
import com.example.gestionfabrication.entities.Employe;
import com.example.gestionfabrication.repositories.EmployeRepository;
import com.example.gestionfabrication.repositories.OrdreFabricationRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeService {

	@Autowired
	private EmployeRepository employeRepository;
	@Autowired
	private OrdreFabricationRepository ordreFabricationRepository;

	// Méthode de conversion Entity -> DTO
	private EmployeDTO convertToDTO(Employe employe) {
		EmployeDTO dto = new EmployeDTO();
		dto.setId(employe.getId());
		dto.setNom(employe.getNom());
		dto.setPrenom(employe.getPrenom());
		dto.setEmail(employe.getEmail());
		dto.setPoste(employe.getPoste());
		return dto;
	}

	// Méthode de conversion DTO -> Entity
	private Employe convertToEntity(EmployeDTO dto) {
		Employe employe = new Employe();
		employe.setId(dto.getId());
		employe.setNom(dto.getNom());
		employe.setPrenom(dto.getPrenom());
		employe.setEmail(dto.getEmail());
		employe.setPoste(dto.getPoste());
		return employe;
	}

	public EmployeDTO createEmploye(Employe employe) {
		return convertToDTO(employeRepository.save(employe));
	}

	public List<EmployeDTO> getAllEmployesDTO() {
		return employeRepository.findAll().stream().map(this::convertToDTO) // Convertir chaque employé en DTO
				.collect(Collectors.toList());
	}

	public EmployeDTO getEmployeByIdDTO(Long id) {
		Optional<Employe> employe = employeRepository.findById(id);
		return employe.map(this::convertToDTO).orElse(null); 
	}

	public void deleteEmploye(Long id) {
		if (!ordreFabricationRepository.existsByEmployeId(id)) {
			employeRepository.deleteById(id);
		} else {
			throw new IllegalStateException(
					"Impossible de supprimer cet employé car il est lié à des ordres de fabrication.");
		}
	}

	public EmployeDTO updateEmploye(Long id, Employe employe) {

		Employe existEmploye = employeRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employé non trouvé"));

		existEmploye.setNom(employe.getNom());
		existEmploye.setPrenom(employe.getPrenom());
		existEmploye.setEmail(employe.getEmail());
		existEmploye.setPoste(employe.getPoste());

		return convertToDTO(employeRepository.save(existEmploye));
	}

	public List<EmployeDTO> findDisponibles(LocalDateTime debut, LocalDateTime fin) {
		List<Employe> disponibles = employeRepository.findEmployesDisponibles(debut, fin);
		return disponibles.stream().map(this::convertToDTO).collect(Collectors.toList());
	}
}