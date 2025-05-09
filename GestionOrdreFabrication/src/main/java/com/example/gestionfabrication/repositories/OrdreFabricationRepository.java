package com.example.gestionfabrication.repositories;

import com.example.gestionfabrication.entities.OrdreFabrication;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long>{

	List<OrdreFabrication> findByStatut(String statut);
	boolean existsByEmployeId(Long employeId);
	boolean existsByMachineId(Long employeId);
	
	@Query("SELECT COUNT(om) > 0 FROM OrdreFabrication om WHERE om.machine.id = :machineId AND om.dateDebut < :dateFin AND om.dateFin > :dateDebut")
	boolean isMachineOccupeePendant(@Param("machineId") Long machineId,
	                                 @Param("dateDebut") LocalDateTime dateDebut,
	                                 @Param("dateFin") LocalDateTime dateFin);

}
