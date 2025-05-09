package com.example.gestionfabrication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeDTO {
    //private String nomEmploye;
    //private String prenomEmploye;
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String poste;

    // Getters et Setters
}
