package com.example.gestionfabrication.dto;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdreFabricationDTO {

    private Long id;
    private String numeroOrdre;
    private Integer quantite;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String statut;
    //private String priorite;
    //private String description;
    private Integer tempsEstimeHeures;
	private Double coutEstime;
	
	private ProduitDTO produit;
    private EmployeDTO employe;
    private MachineDTO machine;
    
 
}
