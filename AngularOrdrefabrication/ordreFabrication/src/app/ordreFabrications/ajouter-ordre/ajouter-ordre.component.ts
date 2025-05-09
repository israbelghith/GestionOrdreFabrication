import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../../Models/produit.model';
import { Employe } from '../../Models/employe.model';
import { Machine } from '../../Models/machine.model';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { ProduitService } from '../../services/produit.service';
import { EmployeService } from '../../services/employe.service';
import { MachineService } from '../../services/machine.service';
import { OrdreFabrication } from '../../Models/ordreFabrication.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-ordre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajouter-ordre.component.html',
  styleUrls: ['./ajouter-ordre.component.css']
})
export class AjouterOrdreComponent implements OnInit {
  produits: Produit[] = [];
  employes: Employe[] = [];
  machines: Machine[] = [];
  ordreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private employeService: EmployeService,
    private machineService: MachineService,
    private ordreService: OrdreFabricationService,
    private router: Router
  ) {
    this.ordreForm = this.fb.group({
      numeroOrdre: ['', Validators.required],
      quantite: ['', Validators.required],
      tempsEstimeHeures: ['', Validators.required],
      coutEstime: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      statut: ['', Validators.required],
      produitId: ['', Validators.required],
      employeId: [null],
      machineId: [null]
    });
  }

  ngOnInit(): void {
    this.produitService.getAll().subscribe(data => this.produits = data);
    this.employeService.getAll().subscribe(data => this.employes = data);
    this.machineService.getAll().subscribe(data => this.machines = data);
  }

  onDateChange(): void {
    const dateDebut = this.ordreForm.get('dateDebut')?.value;
    const dateFin = this.ordreForm.get('dateFin')?.value;

    if (dateDebut && dateFin) {
      const debutISO = new Date(dateDebut).toISOString();
      const finISO = new Date(dateFin).toISOString();

      this.employeService.getDisponibles(debutISO, finISO).subscribe(data => {
        this.employes = data;
      });

      this.machineService.getDisponibles(debutISO, finISO).subscribe(data => {
        this.machines = data;
      });
    } else {
      this.employes = [];
      this.machines = [];
    }
  }

  onSubmit(): void {
    if (this.ordreForm.valid) {
      const formData = this.ordreForm.value;

      const employeDisponible = this.employes.find(e => e.id === formData.employeId);
      const machineDisponible = this.machines.find(m => m.id === formData.machineId);

      const ordreFabrication: OrdreFabrication = {
        numeroOrdre: formData.numeroOrdre,
        quantite: formData.quantite,
        tempsEstimeHeures: formData.tempsEstimeHeures,
        coutEstime: formData.coutEstime,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        statut: formData.statut,
        produit: { id: formData.produitId } as Produit,
        employe: (formData.dateDebut && formData.dateFin) ? employeDisponible ?? null : null,
        machine: (formData.dateDebut && formData.dateFin) ? machineDisponible ?? null : null
      };

      this.ordreService.create(ordreFabrication).subscribe(() => {
        alert("Ordre de fabrication ajouté avec succès !");
        this.router.navigate(['/listOrdre']);
        this.ordreForm.reset();
      });
    }
  }
}
