package com.example.gestionfabrication.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gestionfabrication.dto.MachineDTO;
import com.example.gestionfabrication.entities.Machine;
import com.example.gestionfabrication.repositories.MachineRepository;
import com.example.gestionfabrication.repositories.OrdreFabricationRepository;

@Service
public class MachineService {

	@Autowired
	private MachineRepository machineRepository;
	@Autowired
	private OrdreFabricationRepository ordreFabricationRepository;

	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	private MachineDTO convertToDTO(Machine machine) {
		MachineDTO dto = new MachineDTO();
		dto.setId(machine.getId());
		dto.setDesignation(machine.getDesignation());
		dto.setEtat(machine.getEtat());
		dto.setCodeMachine(machine.getCodeMachine());
		dto.setTypeMachine(machine.getTypeMachine());
		dto.setEtatMaintenance(machine.getEtatMaintenance());
		if (machine.getDateDebutMaintenance() != null) {
			dto.setDateDebutMaintenance(machine.getDateDebutMaintenance());
		}
		if (machine.getDateFinMaintenance() != null) {
			dto.setDateFinMaintenance(machine.getDateFinMaintenance());
		}
		return dto;
	}

/*	private Machine convertToEntity(MachineDTO dto) {
		Machine machine = new Machine();
		machine.setId(dto.getId());
		machine.setDesignation(dto.getDesignation());
		machine.setEtat(dto.getEtat());
		machine.setCodeMachine(dto.getCodeMachine());
		machine.setTypeMachine(dto.getTypeMachine());
		machine.setEtatMaintenance(dto.getEtatMaintenance());

		if (dto.getDateDebutMaintenance() != null)
			machine.setDateDebutMaintenance(dto.getDateDebutMaintenance());
		if (dto.getDateFinMaintenance() != null)
			machine.setDateFinMaintenance(dto.getDateFinMaintenance());

		return machine;
	}
*/
	
	public MachineDTO createMachine(Machine machine) {
		machine.setDateDebutMaintenance(null);
		machine.setDateFinMaintenance(null);
		machine.setEtat("NOUVELLE");
		machine.setEtatMaintenance("AUCUNE");
		return convertToDTO(machineRepository.save(machine));
	}

	public List<MachineDTO> getAllMachines() {
		return machineRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	public MachineDTO getMachineById(Long id) {
		Optional<Machine> optionalMachine = machineRepository.findById(id);
		return optionalMachine.map(this::convertToDTO).orElse(null);
	}

	public void deleteMachine(Long id) {
		if (!ordreFabricationRepository.existsByMachineId(id)) {
			machineRepository.deleteById(id);
		} else {
			throw new IllegalStateException(
					"Impossible de supprimer cette machine car elle est liée à des ordres de fabrication.");
		}
		//machineRepository.deleteById(id);
	}

	public MachineDTO updateMachine(Long id, Machine machine) {
		Machine existingMachine = machineRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Machine non trouvée"));

		
			existingMachine.setDesignation(machine.getDesignation());

			existingMachine.setEtat(machine.getEtat());

			existingMachine.setCodeMachine(machine.getCodeMachine());

			existingMachine.setTypeMachine(machine.getTypeMachine());

			existingMachine.setEtatMaintenance(machine.getEtatMaintenance());

			existingMachine.setDateDebutMaintenance(machine.getDateDebutMaintenance());

			existingMachine.setDateFinMaintenance(machine.getDateFinMaintenance());

		String etatMaintenance = existingMachine.getEtatMaintenance();

	    if ("PLANIFIEE".equals(etatMaintenance)) {
	        existingMachine.setEtat("HORS_SERVICE");  // Machine arrêtée lorsque maintenance planifiée
	    } else if ("EN_COURS".equals(etatMaintenance)) {
	        existingMachine.setEtat("EN_PANNE"); // Machine en panne lorsque maintenance en cours
	    } else if ("TERMINEE".equals(etatMaintenance)) {
	        existingMachine.setEtat("EN_MARCHE"); // Machine en marche lorsque maintenance terminée
	    }
		
		machineRepository.save(existingMachine);

		
		return convertToDTO(existingMachine);

	}
	
	public List<MachineDTO> findDisponibles(LocalDateTime debut, LocalDateTime fin) {
	    List<Machine> disponibles = machineRepository.findMachinesDisponibles(debut, fin);
	    return disponibles.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}


	public MachineDTO mettreAJourMaintenance(Long machineId, Machine machine) {
		Machine existingMachine = machineRepository.findById(machineId)
				.orElseThrow(() -> new RuntimeException("Machine non trouvée"));

		if (machine.getDateDebutMaintenance() != null)
			existingMachine.setDateDebutMaintenance(machine.getDateDebutMaintenance());
		if (machine.getDateFinMaintenance() != null)
			existingMachine.setDateFinMaintenance(machine.getDateFinMaintenance());

		if (existingMachine.getDateDebutMaintenance() != null && existingMachine.getDateDebutMaintenance().after(new Date())) {
		    existingMachine.setEtatMaintenance("PLANIFIEE");
		    existingMachine.setEtat("HORS_SERVICE");
		}
 else if (existingMachine.getDateFinMaintenance() != null
				&& existingMachine.getDateFinMaintenance().after(new Date())) {
			existingMachine.setEtatMaintenance("EN_COURS");
			existingMachine.setEtat("EN_PANNE");
		} else {
			existingMachine.setEtatMaintenance("TERMINEE");
			existingMachine.setEtat("MAINTENANCE_TERMINEE");
		}

		return convertToDTO(machineRepository.save(existingMachine));
	}
	
	
	public MachineDTO activerMachine(Long id) {
	    Machine machine = machineRepository.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Machine non trouvée"));

	        if (!"TERMINEE".equalsIgnoreCase(machine.getEtatMaintenance())) {
	            throw new IllegalStateException("La machine n’est pas en état 'MAINTENANCE_TERMINEE'.");
	        }

	        machine.setEtat("DISPONIBLE");
	        machine.setEtatMaintenance("AUCUNE");

	        return convertToDTO(machineRepository.save(machine)); 
	}


}
