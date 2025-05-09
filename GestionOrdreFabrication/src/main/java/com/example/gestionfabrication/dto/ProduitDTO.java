package com.example.gestionfabrication.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProduitDTO {
	private Long id;
    private String nomProduit;
    
private String codeProduit;
	
	private String categorie;
	
	private int quantiteStock;
	
    private String description;
	
	private String fournisseur;
	
	private double coutUnitaire;

    // Getters et Setters
}
