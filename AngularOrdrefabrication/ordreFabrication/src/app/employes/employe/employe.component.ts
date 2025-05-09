import { Component } from '@angular/core';
import { Employe } from '../../Models/employe.model';
import { CommonModule } from '@angular/common';
import { EmployeService } from '../../services/employe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent {

  employes: Employe[] = [];
errorMessage: any;

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.getEmployes();
  }

  getEmployes(): void {
    this.employeService.getAll().subscribe(data => {
      this.employes = data;
    });
  }
  supprimerEmploye(id: number) {
    this.employeService.delete(id).subscribe({
      next: () => {
        this.getEmployes();  // Rafraîchir la liste des employés après la suppression
        alert('Employé supprimé avec succès !');  // Afficher un message de succès
      },
      error: (error) => {
        // Vérifier si l'erreur est une erreur 409
        if (error.status === 409) {
          // Si l'erreur contient un message d'erreur détaillé du serveur, l'afficher
          this.errorMessage = error.error?.message || 'Impossible de supprimer cet employé en raison d\'un conflit.';
        } else {
          // Affichage de l'erreur générique si ce n'est pas une erreur 409
          this.errorMessage = ` ${error.message || 'Impossible de supprimer cet employé.'}`;
        }
        console.error('Erreur lors de la suppression de l\'employé:', error);
      }
    });
  }


}
