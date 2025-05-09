
import { Component } from '@angular/core';
import { Employe } from '../../Models/employe.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../services/employe.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modifier-employe',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './modifier-employe.component.html',
  styleUrl: './modifier-employe.component.css'
})
export class ModifierEmployeComponent {
  employe: Employe = {
    nom: '',
    prenom: '',
    email: '',
    poste: '',
  };
  errorMessage: any;

  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeService.getById(+id).subscribe(data => {
        this.employe = data;
        console.log("employe get", this.employe);
      });
    }
  }

  onSubmit(): void {
    // Validation des champs avant modification
    if (!this.employe.nom || !this.employe.prenom || !this.employe.email || !this.employe.poste) {
      this.errorMessage = 'Tous les champs doivent être remplis.';
      return;
    }

    // Réinitialisation du message d'erreur
    this.errorMessage = '';

    if (!this.employe.id) {
      alert('Aucun employé sélectionné à modifier.');
      return;
    }

    this.employeService.update(this.employe.id, this.employe)
      .subscribe({
        next: () => {
          alert('Employé modifié avec succès !');
          this.router.navigate(['/listEmploye']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification :', err);
          this.errorMessage = err.error?.message || err.message || 'Impossible de modifier cet employé.';
        }
      });
  }


}
