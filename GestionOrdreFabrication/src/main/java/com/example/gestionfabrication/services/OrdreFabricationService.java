package com.example.gestionfabrication.services;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gestionfabrication.dto.EmployeDTO;
import com.example.gestionfabrication.dto.MachineDTO;
import com.example.gestionfabrication.dto.OrdreFabricationDTO;
import com.example.gestionfabrication.dto.ProduitDTO;
import com.example.gestionfabrication.entities.Employe;
import com.example.gestionfabrication.entities.Machine;
import com.example.gestionfabrication.entities.OrdreFabrication;
import com.example.gestionfabrication.entities.Produit;
import com.example.gestionfabrication.repositories.EmployeRepository;
import com.example.gestionfabrication.repositories.MachineRepository;
import com.example.gestionfabrication.repositories.OrdreFabricationRepository;
import com.example.gestionfabrication.repositories.ProduitRepository;

@Service
public class OrdreFabricationService {

	 @Autowired
	    private OrdreFabricationRepository ordreFabricationRepository;

	    @Autowired
	    private EmployeRepository employeRepository;

	    @Autowired
	    private MachineRepository machineRepository;

	    @Autowired
	    private ProduitRepository produitRepository;

	    public List<OrdreFabricationDTO> getAllOrdres() {
	        return ordreFabricationRepository.findAll().stream()
	                .map(this::convertToDTO)
	                .collect(Collectors.toList());
	    }

	    public OrdreFabricationDTO getOrdreById(Long id) {
	        OrdreFabrication ordre = ordreFabricationRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Ordre de fabrication non trouvé"));
	        return convertToDTO(ordre);
	    }

	    public List<OrdreFabricationDTO> getOrdresParStatut(String statut) {
	        return ordreFabricationRepository.findByStatut(statut).stream()
	                .map(this::convertToDTO)
	                .collect(Collectors.toList());
	    }

	    public OrdreFabricationDTO createOrdre(OrdreFabrication ordreFabrication) {
	    Machine m=	ordreFabrication.getMachine();
	    m.setEtat("EN_MARCHE");
	    machineRepository.save(m);
	        return convertToDTO(ordreFabricationRepository.save(ordreFabrication));
	    }

	    public boolean estMachineOccupeePendantPeriode(Long machineId, LocalDateTime dateDebut, LocalDateTime dateFin) {
	        return ordreFabricationRepository.isMachineOccupeePendant(machineId, dateDebut, dateFin);
	    }

	  

	    
	    public void deleteOrdre(Long id) {
	        ordreFabricationRepository.deleteById(id);
	    }

	    public OrdreFabricationDTO affecterMachineEtEmploye(Long ordreId, Long employeId, Long machineId) {
	        OrdreFabrication ordreFabrication = ordreFabricationRepository.findById(ordreId)
	                .orElseThrow(() -> new RuntimeException("Ordre de fabrication non trouvé"));

	        Employe employe = employeRepository.findById(employeId)
	                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

	        Machine machine = machineRepository.findById(machineId)
	                .orElseThrow(() -> new RuntimeException("Machine non trouvée"));

	        ordreFabrication.setEmploye(employe);
	        machine.setEtat("EN_MARCHE");
	        ordreFabrication.setMachine(machine);

	        return convertToDTO(ordreFabricationRepository.save(ordreFabrication));
	    }
	    public OrdreFabricationDTO updateOrdreFabrication(Long ordreId, OrdreFabrication ordreFabricationReceive) {
	        // Vérifier si l'ordre de fabrication existe
	        OrdreFabrication ordreFabrication = ordreFabricationRepository.findById(ordreId)
	                .orElseThrow(() -> new RuntimeException("Ordre de fabrication non trouvé"));

	        // Mettre à jour les informations de l'ordre de fabrication
	        ordreFabrication.setNumeroOrdre(ordreFabricationReceive.getNumeroOrdre());
	        ordreFabrication.setQuantite(ordreFabricationReceive.getQuantite());
	        ordreFabrication.setDateDebut(ordreFabricationReceive.getDateDebut());
	        ordreFabrication.setDateFin(ordreFabricationReceive.getDateFin());
	        ordreFabrication.setStatut(ordreFabricationReceive.getStatut());
	        //ordreFabrication.setPriorite(ordreFabricationReceive.getPriorite());
	       // ordreFabrication.setDescription(ordreFabricationReceive.getDescription());
	        ordreFabrication.setTempsEstimeHeures(ordreFabricationReceive.getTempsEstimeHeures());
	        ordreFabrication.setCoutEstime(ordreFabricationReceive.getCoutEstime());

	        // Mettre à jour les objets liés : Produit, Employe, Machine
	        if (ordreFabricationReceive.getProduit() != null) {
	            Produit produit = produitRepository.findById(ordreFabricationReceive.getProduit().getId())
	                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
	            ordreFabrication.setProduit(produit);
	        }

	        if (ordreFabricationReceive.getEmploye() != null) {
	            Employe employe = employeRepository.findById(ordreFabricationReceive.getEmploye().getId())
	                    .orElseThrow(() -> new RuntimeException("Employé non trouvé"));
	            ordreFabrication.setEmploye(employe);
	        }

	        if (ordreFabricationReceive.getMachine() != null) {
	            Machine machine = machineRepository.findById(ordreFabricationReceive.getMachine().getId())
	                    .orElseThrow(() -> new RuntimeException("Machine non trouvée"));
	            ordreFabrication.setMachine(machine);
	        }

	        // Sauvegarder l'ordre de fabrication mis à jour
	        return convertToDTO(ordreFabricationRepository.save(ordreFabrication));
	    }
	    

	    private OrdreFabricationDTO convertToDTO(OrdreFabrication ordre) {
	        OrdreFabricationDTO dto = new OrdreFabricationDTO();
	        dto.setId(ordre.getId());
	        dto.setNumeroOrdre(ordre.getNumeroOrdre());
	        dto.setQuantite(ordre.getQuantite());
	        dto.setDateDebut(ordre.getDateDebut());
	        dto.setDateFin(ordre.getDateFin());
	        dto.setStatut(ordre.getStatut());
	       // dto.setPriorite(ordre.getPriorite());
	        //dto.setDescription(ordre.getDescription());
	        dto.setTempsEstimeHeures(ordre.getTempsEstimeHeures());
	        dto.setCoutEstime(ordre.getCoutEstime());

	        if (ordre.getProduit() != null) {
	            Produit produit = ordre.getProduit();
	            ProduitDTO produitDTO = new ProduitDTO();
	            produitDTO.setId(produit.getId());
	            produitDTO.setNomProduit(produit.getNomProduit());
	            produitDTO.setDescription(produit.getDescription());
	            dto.setProduit(produitDTO);
	        }

	        if (ordre.getEmploye() != null) {
	            Employe employe = ordre.getEmploye();
	            EmployeDTO employeDTO = new EmployeDTO();
	            employeDTO.setId(employe.getId());
	            employeDTO.setNom(employe.getNom());
	            employeDTO.setPrenom(employe.getPrenom());
	            dto.setEmploye(employeDTO);
	        }

	        if (ordre.getMachine() != null) {
	            Machine machine = ordre.getMachine();
	            MachineDTO machineDTO = new MachineDTO();
	            machineDTO.setId(machine.getId());
	            machineDTO.setDesignation(machine.getDesignation());
	            machineDTO.setEtat(machine.getEtat());
	            dto.setMachine(machineDTO);
	        }

	        return dto;
	    }
	    public List<OrdreFabricationDTO> rechercherMultiCritere(String statut, String produit, String employe, String machine) {
	        return ordreFabricationRepository.findAll().stream()
	                .filter(ordre -> statut == null || ordre.getStatut().equalsIgnoreCase(statut))
	                .filter(ordre -> produit == null || (ordre.getProduit() != null && ordre.getProduit().getNomProduit().equalsIgnoreCase(produit)))
	                .filter(ordre -> employe == null || (ordre.getEmploye() != null && ordre.getEmploye().getNom().equalsIgnoreCase(employe)))
	                .filter(ordre -> machine == null || (ordre.getMachine() != null && ordre.getMachine().getDesignation().equalsIgnoreCase(machine)))
	                .map(this::convertToDTO)
	                .collect(Collectors.toList());
	    }
	
	  
}
