import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ProduitService } from '../../services/produit.service';
import { EmployeService } from '../../services/employe.service';
import { MachineService } from '../../services/machine.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-ordre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-ordre.component.html',
  styleUrls: ['./modifier-ordre.component.css']
})
export class ModifierOrdreComponent implements OnInit {
  ordreForm!: FormGroup;
  ordreId: number = 0;
  produits: any[] = [];
  employes: any[] = [];
  machines: any[] = [];
  errorMessage: string = '';
  existingOrdreData: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService,
    private employeService: EmployeService,
    private machineService: MachineService
  ) {}

  ngOnInit(): void {
    this.ordreId = +this.route.snapshot.paramMap.get('id')!;
    this.ordreForm = this.fb.group({
      numeroOrdre: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      tempsEstimeHeures: ['', Validators.required],
      coutEstime: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['', Validators.required],
      produitId: ['', Validators.required],
      employeId: ['', Validators.required],
      machineId: ['', Validators.required],
    });

    this.loadOrdreData();
    this.loadDropdownData();
  }

  loadOrdreData(): void {
    this.ordreService.getOrdreById(this.ordreId).subscribe(data => {
      console.log("Données reçues:", data); // Ajoute ce log pour vérifier les valeurs
      this.existingOrdreData = data;
      this.ordreForm.patchValue({
        numeroOrdre: data.numeroOrdre,
        quantite: data.quantite,
        tempsEstimeHeures: data.tempsEstimeHeures,
        coutEstime: data.coutEstime,
        dateDebut: this.formatDate(data.dateDebut),
        dateFin: this.formatDate(data.dateFin),
        statut: data.statut,
        produitId: data.produit.id,
        employeId: data.employe.id,
        machineId: data.machine.id,
      });

      // Désactiver les champs employeId et machineId
      this.ordreForm.get('employeId')?.disable();
      this.ordreForm.get('machineId')?.disable();
    }, (error) => {
      this.errorMessage = `Erreur lors de la récupération de l'ordre: ${error.message}`;
    });
  }



  formatDate(date: string): string {
    const d = new Date(date);
    // Ajuste la date pour éviter le problème de fuseau horaire
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Mois de 1 à 12
    const day = String(d.getDate()).padStart(2, '0');  // Jour de 01 à 31
    const hours = String(d.getHours()).padStart(2, '0');  // Heure de 00 à 23
    const minutes = String(d.getMinutes()).padStart(2, '0');  // Minutes de 00 à 59
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  loadDropdownData(): void {
    this.produitService.getAll().subscribe((data) => {
      this.produits = data ?? [];
    });

    this.employeService.getAll().subscribe((data) => {
      this.employes = data ?? [];
    });

    this.machineService.getAll().subscribe((data) => {
      this.machines = data ?? [];
    });
  }

  onSubmit(): void {
    if (this.ordreForm.invalid) {
      return;
    }

    // Détecter les modifications
    const updatedOrdre = { ...this.ordreForm.value };

    console.log("modified data :", updatedOrdre);

    // Comparer les produits, employés et machines, et prendre les nouvelles données si elles ont changé
    const produit = this.produits.find(p => p.id === updatedOrdre.produitId);
    const employe = this.employes.find(e => e.id === updatedOrdre.employeId);
    const machine = this.machines.find(m => m.id === updatedOrdre.machineId);

    // Si l'ID du produit, employé ou machine n'est pas trouvé, on utilise les anciennes données
    updatedOrdre.produit = produit ?? this.existingOrdreData.produit;
    updatedOrdre.employe = employe ?? this.existingOrdreData.employe;
    updatedOrdre.machine = machine ?? this.existingOrdreData.machine;

    // Vérifier si les objets sont valides
    if (!updatedOrdre.produit || !updatedOrdre.employe || !updatedOrdre.machine) {
      this.errorMessage = 'Produit, employé ou machine non trouvés.';
      return;
    }

    // Envoi des données modifiées ou non modifiées avec les objets complets
    this.ordreService.updateOrdre(this.ordreId, updatedOrdre).subscribe(
      () => {
        this.router.navigate(['/listOrdre']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        this.errorMessage = `Erreur de mise à jour de l'ordre: ${error.message}`;
      }
    );
  }

}
