package com.example.gestionfabrication.entities;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class OrdreFabrication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String numeroOrdre;
	
	private int quantite;
	private LocalDateTime dateDebut;
	private LocalDateTime dateFin;

	private String statut;
	//private String description;
	
	@Column(nullable = false)
	private Integer tempsEstimeHeures;

	@Column(nullable = false)
	private Double coutEstime;

	 @ManyToOne
	    @JoinColumn(name = "produit_id")
	    private Produit produit;

	    @ManyToOne
	    @JoinColumn(name = "employe_id")
	    private Employe employe;

	    @ManyToOne
	    @JoinColumn(name = "machine_id")
	    private Machine machine;
}
