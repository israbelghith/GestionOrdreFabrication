package com.example.gestionfabrication.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MachineDTO {
    private Long id;
    private String designation;
    private String etat;
    private String codeMachine;
    private String typeMachine;
    private String etatMaintenance;
    private Date dateDebutMaintenance;
    private Date dateFinMaintenance;
}
