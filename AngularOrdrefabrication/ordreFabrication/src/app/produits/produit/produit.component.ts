import { Component, OnInit } from '@angular/core';
import { Produit } from '../../Models/produit.model';
import { ProduitService } from '../../services/produit.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = []; // Liste des produits
  errorMessage: string = ''; // Message d'erreur, si nécessaire

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  // Méthode pour charger la liste des produits depuis le service
  loadProduits(): void {
    this.produitService.getAll().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        console.log("produits",data);
      },
      (error: any) => {
        alert('Erreur lors du chargement des produits');
        console.error(error);
      }
    );
  }

  // Méthode pour supprimer un produit
  supprimerProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitService.delete(id).subscribe(
        () => {
          this.produits = this.produits.filter(p => p.id !== id);
        },
        (error: any) => {
          this.errorMessage = 'Erreur lors de la suppression du produit.';
          console.error(error);
        }
      );
    }
  }
}
