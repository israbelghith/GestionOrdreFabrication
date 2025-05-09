import { Component } from '@angular/core';
import { Employe } from '../../Models/employe.model';
import { EmployeService } from '../../services/employe.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-employe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-employe.component.html',
  styleUrl: './ajouter-employe.component.css'
})
export class AjouterEmployeComponent {
  nouvelEmploye= {
    nom: '',
    prenom: '',
    email: '',
    poste: ''
  };

  errorMessage = '';


  constructor(private employeService: EmployeService, private router: Router) {}

  ngOnInit(): void {}

  ajouterEmploye() {
    // Validation des champs
    if (!this.nouvelEmploye.nom || !this.nouvelEmploye.prenom || !this.nouvelEmploye.email || !this.nouvelEmploye.poste) {
      this.errorMessage = 'Tous les champs doivent être remplis.';
      return;
    }

    // Réinitialisation du message d'erreur
    this.errorMessage = '';

    console.log("Employé : ", this.nouvelEmploye);
    this.employeService.create(this.nouvelEmploye).subscribe({
      next: () => {
        alert('Employé ajouté avec succès');
        this.nouvelEmploye = { nom: '', prenom: '', email: '', poste: '' }; // réinitialiser le formulaire
        this.router.navigate(['/listEmploye']);
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de l'ajout de l'employé : " + err.message;
      }
    });
  }
}
