package com.example.gestionfabrication.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestControllerAdvice
public class GlobalExceptionHandler {

	 private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	// Capture toutes les exceptions non gérées dans l'application
	    
	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<Map<String, String>> handleAllExceptions(Exception ex) {
	        logger.error("Unexpected error occurred: ", ex);

	        Map<String, String> response = new HashMap<>();
	        response.put("message", ex.getMessage());  
	        response.put("exception", ex.getClass().getSimpleName());

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }


	    // Capture les exceptions spécifiques comme NullPointerException
	    @ExceptionHandler(NullPointerException.class)
	    public ResponseEntity<Map<String, String>> handleNullPointerException(NullPointerException ex) {
	        logger.error("NullPointerException occurred: ", ex);
	        
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "A null pointer exception occurred.");
	        
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }

	    // Capture une exception personnalisée d'entité non trouvée (ex: produit, machine, etc.)
	    @ExceptionHandler(EntityNotFoundException.class)
	    public ResponseEntity<Map<String, String>> handleEntityNotFound(EntityNotFoundException ex) {
	        logger.error("Entity not found: ", ex);
	        
	        Map<String, String> response = new HashMap<>();
	        response.put("message", ex.getMessage());
	        
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }
	    
	    /* capturer des exceptions spécifiques comme IllegalStateException,  */
	   
	    @ExceptionHandler(IllegalStateException.class)
	    public ResponseEntity<Map<String, String>> handleIllegalStateException(IllegalStateException ex) {
	        Map<String, String> response = new HashMap<>();
	        response.put("message", ex.getMessage());
	        
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	    }
	    
}
