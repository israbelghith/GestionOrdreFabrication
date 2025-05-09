import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeService } from '../../services/employe.service';
import { MachineService } from '../../services/machine.service';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affectation-ordre',
  imports: [CommonModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './affectation-ordre.component.html',
  styleUrl: './affectation-ordre.component.css'
})
export class AffectationOrdreComponent implements OnInit {
  affectationForm!: FormGroup;
  employes: any[] = [];
  machines: any[] = [];
  ordreId!: number;
  message = '';
  errorMessage = '';
  ordreDebut!: Date;
  ordreFin!: Date;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeService: EmployeService,
    private machineService: MachineService,
    private ordreService: OrdreFabricationService
  ) {}

  ngOnInit(): void {
    this.affectationForm = this.fb.group({
      employeId: [null, Validators.required],  // Initialiser à null pour autoriser "Aucun employé"
      machineId: [null, Validators.required]   // Initialiser à null pour autoriser "Aucune machine"
    });

    // Récupère l'ID de l'ordre depuis l'URL
    this.ordreId = +this.route.snapshot.paramMap.get('id')!;

    // Charger les données des employés et machines
    this.loadData();
    this.loadOrdreDetails();
  }

  loadData(): void {
    // Récupère les employés et machines disponibles pendant la période
    this.ordreService.getOrdreById(this.ordreId).subscribe({
      next: (ordre) => {
        const debut = new Date(ordre.dateDebut);
        debut.setHours(0, 0, 0); // début de journée

        const fin = new Date(ordre.dateFin);
        fin.setHours(23, 59, 59); // fin de journée

        const debutISO = debut.toISOString();
        const finISO = fin.toISOString();
        this.ordreDebut = debut;
this.ordreFin = fin;


        // Charger les employés disponibles
        this.employeService.getDisponibles(debutISO, finISO)
          .subscribe(data => this.employes = data);

        // Charger les machines disponibles
        this.machineService.getDisponibles(debutISO, finISO)
          .subscribe(data => this.machines = data);
      },
      error: () => this.errorMessage = "Erreur lors du chargement des données de l'ordre."
    });
  }


  loadOrdreDetails(): void {
    this.ordreService.getOrdreById(this.ordreId).subscribe({
      next: (ordre) => {
        this.affectationForm.patchValue({
          employeId: ordre.employe?.id || null,
          machineId: ordre.machine?.id || null
        });
      },
      error: (err) => {
        this.errorMessage = "Impossible de charger l'ordre.";
      }
    });
  }

  onSubmit(): void {
    if (this.affectationForm.invalid) return;

    const { employeId, machineId } = this.affectationForm.value;

    this.ordreService.affecterMachineEtEmploye(this.ordreId, employeId, machineId).subscribe({
      next: (updatedOrdre) => {
        this.message = `Ordre ${updatedOrdre.id} mis à jour avec succès !`;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = `Erreur : ${error.message}`;
        this.message = '';
      }
    });
  }
}
