package com.example.gestionfabrication.repositories;

import com.example.gestionfabrication.entities.Employe;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long>{

	@Query("SELECT e FROM Employe e WHERE e.id NOT IN (SELECT ef.employe.id FROM OrdreFabrication ef WHERE ef.dateDebut < :fin AND ef.dateFin > :debut)")
	List<Employe> findEmployesDisponibles(@Param("debut") LocalDateTime debut, @Param("fin") LocalDateTime fin);

}
