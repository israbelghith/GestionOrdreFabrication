import { Component, OnInit } from '@angular/core';
import { OrdreFabricationService } from '../../services/ordre-fabrication.service';
import { OrdreFabrication } from '../../Models/ordreFabrication.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { MachineService } from '../../services/machine.service';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-ordre-fabrication',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ordre-fabrication.component.html',
  styleUrl: './ordre-fabrication.component.css'
})
export class OrdreFabricationComponent implements OnInit {
  ordreFabrications: OrdreFabrication[] = []; // Liste des produits
  errorMessage: string = ''; // Message d'erreur, si nécessaire
 // statutRecherche: string = '';
  //variable

  statutRecherche: string = '';
  produitRecherche: string = '';
  employeRecherche: string = '';
  machineRecherche: string = '';

  statuts: string[] = ['Planifié', 'En cours', 'Terminé'];
  produits: any[] = [];
  employes: any[] = [];
  machines: any[] = [];
  //

  constructor(private ordreFabService: OrdreFabricationService,
    private prodService: ProduitService,
    private machineService: MachineService,
    private employeService: EmployeService,
  ) { }

  ngOnInit(): void {
    this.loadOrdres();
    this.loadProduits();
    this.loadEmployes();
    this.loadMachines();
  }

  loadProduits(): void {
    this.prodService.getAll().subscribe(
      data => this.produits = data,

      error => console.error('Erreur chargement produits', error)
    );
    console.log("prod",this.produits);
  }

  loadEmployes(): void {
    this.employeService.getAll().subscribe(
      data => this.employes = data,
      error => console.error('Erreur chargement employés', error)
    );
  }

  loadMachines(): void {
    this.machineService.getAll().subscribe(
      data => this.machines = data,
      error => console.error('Erreur chargement machines', error)
    );
  }

  rechercherAvancee(): void {
    const params: any = {};
    if (this.statutRecherche) params.statut = this.statutRecherche;
    if (this.produitRecherche) params.produit = this.produitRecherche;
    if (this.employeRecherche) params.employe = this.employeRecherche;
    if (this.machineRecherche) params.machine = this.machineRecherche;

    this.ordreFabService.rechercherMultiCritere(params).subscribe(
      data => this.ordreFabrications = data,
      error => {
        this.errorMessage = 'Erreur lors de la recherche.';
        console.error(error);
      }
    );
  }
  // Méthode pour charger la liste des produits depuis le service
  loadOrdres(): void {
    this.ordreFabService.getAll().subscribe(
      (data: OrdreFabrication[]) => {
        this.ordreFabrications = data;
        console.log("produits",data);
      },
      (error: any) => {
        alert('Erreur lors du chargement des produits');
        console.error(error);
      }
    );
  }

 /* rechercherParStatut(): void {
    if (!this.statutRecherche.trim()) {
      this.loadProduits();
      return;
    }

    this.ordreFabService.getByStatut(this.statutRecherche.trim()).subscribe(
      (data: OrdreFabrication[]) => {
        this.ordreFabrications = data;
      },
      (error: any) => {
        this.errorMessage = `Erreur lors de la recherche par statut : ${this.statutRecherche}`;
        console.error(error);
      }
    );
  }*/


  // Méthode pour supprimer un produit
  supprimerOrdreFabrication(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ordre de fabrication ?')) {
      this.ordreFabService.delete(id).subscribe(
        () => {
          this.ordreFabrications = this.ordreFabrications.filter(p => p.id !== id);
        },
        (error: any) => {
          this.errorMessage = 'Erreur lors de la suppression du l\'ordre de fabrication.';
          console.error(error);
        }
      );
    }
  }
}
