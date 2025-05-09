package com.example.gestionfabrication.entities;

import java.util.Date;
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
public class Machine {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String codeMachine;

    @Column(nullable = false)
    private String designation;

    private String typeMachine; 

    private String etat; 
    
    private Date dateDebutMaintenance;
    private Date dateFinMaintenance;
    private String etatMaintenance; 

    @OneToMany(mappedBy = "machine")
    private List<OrdreFabrication> ordresFabrication;
   
    public boolean isAvailableDuringPeriod(Date startDate, Date endDate) {
        // Vérifie si la machine est en maintenance pendant la période donnée
        if (dateDebutMaintenance != null && dateFinMaintenance != null) {
            return !(startDate.before(dateFinMaintenance) && endDate.after(dateDebutMaintenance));
        }
        // Si pas de maintenance prévue, la machine est disponible
        return true;
    }

}
