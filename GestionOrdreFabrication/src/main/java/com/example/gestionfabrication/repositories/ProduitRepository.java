package com.example.gestionfabrication.repositories;

import com.example.gestionfabrication.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long>{

}
