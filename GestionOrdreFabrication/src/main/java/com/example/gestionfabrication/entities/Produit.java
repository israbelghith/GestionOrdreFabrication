package com.example.gestionfabrication.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Produit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
    private String codeProduit;
	
	@Column(nullable = false)
    private String nomProduit;
	
	private String categorie;
	
	@Column(nullable = false)
	private int quantiteStock;
	
	@Column(length = 500)
    private String description;
	
	private String fournisseur;
	
	private double coutUnitaire;
	
	@OneToMany(mappedBy = "produit")
	private List<OrdreFabrication> ordresFabrication;
}
