package com.example.gestionfabrication.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gestionfabrication.dto.ProduitDTO;
import com.example.gestionfabrication.entities.Produit;
import com.example.gestionfabrication.repositories.ProduitRepository;



@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    
    public ProduitDTO createProduit(Produit produit) {
        return mapToDTO(produitRepository.save(produit));
    }

  
    public List<ProduitDTO> getAllProduits() {
        return produitRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    public ProduitDTO getProduitById(Long idProduit) {
        Produit produit = produitRepository.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        return mapToDTO(produit);
    }


    public ProduitDTO updateProduit(Long idProduit, Produit produit) {
        Produit existProduit = produitRepository.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        
        // Mise à jour des champs
        existProduit.setNomProduit(produit.getNomProduit());
        existProduit.setCodeProduit(produit.getCodeProduit());
        existProduit.setCategorie(produit.getCategorie());
        existProduit.setQuantiteStock(produit.getQuantiteStock());
        existProduit.setDescription(produit.getDescription());
        existProduit.setFournisseur(produit.getFournisseur());
        existProduit.setCoutUnitaire(produit.getCoutUnitaire());

        Produit updatedProduit = produitRepository.save(existProduit);
        return mapToDTO(updatedProduit);
    }

  
    public void deleteProduit(Long idProduit) {
        Produit produit = produitRepository.findById(idProduit)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        produitRepository.delete(produit);
    }

   
  /*  private Produit mapToEntity(ProduitDTO dto) {
        Produit produit = new Produit();
        produit.setNomProduit(dto.getNomProduit());
        produit.setCodeProduit(dto.getCodeProduit());
        produit.setCategorie(dto.getCategorie());
        produit.setQuantiteStock(dto.getQuantiteStock());
        produit.setDescription(dto.getDescription());
        produit.setFournisseur(dto.getFournisseur());
        produit.setCoutUnitaire(dto.getCoutUnitaire());
        return produit;
    }*/

 
    private ProduitDTO mapToDTO(Produit produit) {
        return new ProduitDTO(
        		produit.getId(),
                produit.getNomProduit(),
                produit.getCodeProduit(),
                produit.getCategorie(),
                produit.getQuantiteStock(),
                produit.getDescription(),
                produit.getFournisseur(),
                produit.getCoutUnitaire()
        );
    }
}
