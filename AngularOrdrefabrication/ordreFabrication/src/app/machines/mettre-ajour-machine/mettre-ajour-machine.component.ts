import { Component, OnInit } from '@angular/core';
import { Machine } from '../../Models/machine.model';
import { MachineService } from '../../services/machine.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mettre-ajour-machine',
  imports: [FormsModule],
  templateUrl: './mettre-ajour-machine.component.html',
  styleUrl: './mettre-ajour-machine.component.css'
})
export class MettreAjourMachineComponent implements OnInit{
  machine: any = {}; // adapte selon ton interface
  machineId!: number;

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'ID de l'URL
    this.machineId = Number(this.route.snapshot.paramMap.get('id'));

    // (Facultatif) Tu peux ici charger les données de la machine pour préremplir le formulaire
    this.machineService.getById(this.machineId).subscribe({
      next: (data) => {
        this.machine = {
          dateDebutMaintenance: data.dateDebutMaintenance ? this.formatDateForInput(data.dateDebutMaintenance) : '',
          dateFinMaintenance: data.dateFinMaintenance ? this.formatDateForInput(data.dateFinMaintenance) : '',
        };
      },
      error: (err) => {
        console.error('Erreur de chargement de la machine', err);
      }
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  mettreAJour(): void {
    const debut = new Date(this.machine.dateDebutMaintenance);
    const fin = new Date(this.machine.dateFinMaintenance);

    if (debut > fin) {
      alert("La date de début doit être inférieure à la date de fin !");
      return;
    }

   /* this.machineService.mettreAJourMaintenance(this.machineId, this.machine).subscribe({
      next: (data) => {
        console.log('Mise à jour réussie', data);
        this.router.navigate(['/listMachine']);
      },
      error: (error) => {
        console.error('Erreur de mise à jour : ', error);
      }
    });*/

    this.machineService.estOccupee(this.machineId, debut.toISOString(), fin.toISOString()).subscribe({
      next: (estOccupee) => {
        let confirmation = false;

        if (estOccupee) {
          alert("La machine est déjà affectée à un ordre de fabrication pendant cette période !");
          confirmation = window.confirm("Voulez-vous quand même confirmer la maintenance ?");
        } else {
          confirmation = window.confirm("Voulez-vous confirmer cette maintenance ?");
        }

        if (confirmation) {
          this.machineService.mettreAJourMaintenance(this.machineId, this.machine).subscribe({
            next: (data) => {
              console.log('Mise à jour réussie', data);
              this.router.navigate(['/listMachine']);
            },
            error: (error) => {
              console.error('Erreur de mise à jour : ', error);
            }
          });
        } else {
          console.log("La maintenance n'a pas été confirmée.");
        }
      },
      error: (err) => {
        console.error('Erreur de vérification', err);
      }
    });
  }
}
