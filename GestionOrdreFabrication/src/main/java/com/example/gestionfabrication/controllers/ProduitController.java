package com.example.gestionfabrication.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionfabrication.dto.ProduitDTO;
import com.example.gestionfabrication.entities.Produit;
import com.example.gestionfabrication.services.ProduitService;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {

	@Autowired
    private  ProduitService produitService;

    @PostMapping
    public ProduitDTO createProduit(@RequestBody Produit produit) {
        return produitService.createProduit(produit);
    }

    @GetMapping("/allproduits")
    public List<ProduitDTO> getAllProduits() {
        return produitService.getAllProduits();
    }

    @GetMapping("/{id}")
    public ProduitDTO getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id);
    }

    @PutMapping("/{id}")
    public ProduitDTO updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        return produitService.updateProduit(id, produit);
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
    }
}