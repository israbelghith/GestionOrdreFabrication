import { Component } from '@angular/core';
import { Produit } from '../../Models/produit.model';
import { ProduitService } from '../../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-produit',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-produit.component.html',
  styleUrl: './ajouter-produit.component.css'
})
export class AjouterProduitComponent {
  nouveauProduit: Produit = {
    nomProduit: '',
    codeProduit: '',
    categorie: '',
    quantiteStock: 0,
    description: '',
    fournisseur: '',
    coutUnitaire: 0
  };
  errorMessage: string='';

  constructor(private produitService: ProduitService) {}

  ajouterProduit(): void {
    if (!this.nouveauProduit.codeProduit || !this.nouveauProduit.nomProduit || !this.nouveauProduit.categorie || !this.nouveauProduit.quantiteStock || !this.nouveauProduit.description || !this.nouveauProduit.fournisseur || !this.nouveauProduit.coutUnitaire) {
      this.errorMessage = 'Tous les champs doivent être remplis.';
      return;
    }
    this.produitService.create(this.nouveauProduit).subscribe({
      next: () => {
        alert('Produit ajouté avec succès');
        this.nouveauProduit = {
          nomProduit: '',
          codeProduit: '',
          categorie: '',
          quantiteStock: 0,
          description: '',
          fournisseur: '',
          coutUnitaire: 0
        };
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit', err);
        alert('Erreur lors de l\'ajout du produit');
      }
    });
  }
}
