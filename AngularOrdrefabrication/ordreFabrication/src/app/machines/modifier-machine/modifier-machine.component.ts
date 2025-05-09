import { Component, OnInit } from '@angular/core';
import { Machine } from '../../Models/machine.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MachineService } from '../../services/machine.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-machine',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './modifier-machine.component.html',
  styleUrl: './modifier-machine.component.css'
})
export class ModifierMachineComponent implements OnInit {
  machine: Machine = {
    codeMachine: '',
    designation: '',
    typeMachine: '',
    etat: '',
    dateDebutMaintenance: '',
    dateFinMaintenance: '',
    etatMaintenance: ''
  };
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.machineService.getById(id).subscribe(data => {
      this.machine = data;
console.log("machine ",data);
      // Formatter les dates pour l'affichage dans les champs <input type="date">
      if (this.machine.dateDebutMaintenance) {
        this.machine.dateDebutMaintenance = this.formatDate(this.machine.dateDebutMaintenance);
      }

      if (this.machine.dateFinMaintenance) {
        this.machine.dateFinMaintenance = this.formatDate(this.machine.dateFinMaintenance);
      }
    });
  }

  formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // retourne "YYYY-MM-DD"
  }
  modifierMachine(): void {
     // Vérification que tous les champs sont remplis
     if (!this.machine.codeMachine || !this.machine.designation || !this.machine.typeMachine ||
      !this.machine.etat || !this.machine.dateDebutMaintenance || !this.machine.dateFinMaintenance ||
      !this.machine.etatMaintenance) {
      this.errorMessage = "Tous les champs doivent être remplis.";
    return; // Empêche la soumission
  }
    const dateDebut = this.machine.dateDebutMaintenance;
    const dateFin = this.machine.dateFinMaintenance;
    if (!dateDebut || !dateFin) {
      alert("Veuillez remplir les deux dates.");
      return;
    }

    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
  if (debut > fin) {
    alert("La date de début doit être inférieure à la date de fin !");
    return; // empêche la soumission
  }else{
    this.machineService.update(this.machine.id!, this.machine).subscribe({
      next: () => {
        alert('Machine modifiée avec succès');
        this.router.navigate(['/listMachine']);
      },
      error: (err) => {
        alert("Erreur lors de la modification : " + err.message);
      }
    });
  }}
}
