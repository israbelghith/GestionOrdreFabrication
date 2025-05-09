package com.example.gestionfabrication.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.gestionfabrication.entities.Machine;

@Repository
public interface MachineRepository  extends JpaRepository<Machine, Long>{
	@Query("""
		    SELECT m FROM Machine m 
		    WHERE m.etat IN ('NOUVELLE', 'DISPONIBLE', 'MAINTENANCE_TERMINEE', 'EN_MARCHE')
		      AND m.id NOT IN (
		          SELECT om.machine.id FROM OrdreFabrication om 
		          WHERE om.dateDebut < :fin AND om.dateFin > :debut
		      )
		""")
		List<Machine> findMachinesDisponibles(@Param("debut") LocalDateTime debut, @Param("fin") LocalDateTime fin);

	List<Machine> findByEtatMaintenance(String etatMaintenance);

}
