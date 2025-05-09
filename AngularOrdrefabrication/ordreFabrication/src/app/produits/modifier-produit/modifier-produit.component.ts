import { Component, OnInit } from '@angular/core';
import { Produit } from '../../Models/produit.model';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-produit',
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-produit.component.html',
  styleUrl: './modifier-produit.component.css'
})
export class ModifierProduitComponent implements OnInit {

  produit: Produit = {
    nomProduit: '',
    codeProduit: '',
    categorie: '',
    quantiteStock: 0,
    description: '',
    fournisseur: '',
    coutUnitaire: 0
  };

  idProduit: number=0;
  errorMessage: string='';

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || isNaN(+idParam)) {
      alert("ID du produit invalide !");
      return;
    }

    this.idProduit = +idParam;

    this.produitService.getById(this.idProduit).subscribe({
      next: (data) => this.produit = data,
      error: (err) => console.error('Erreur lors du chargement du produit', err)
    });
  }


  modifierProduit(): void {
   // Validation des champs
   if (!this.produit.codeProduit || !this.produit.nomProduit || !this.produit.categorie || !this.produit.quantiteStock || !this.produit.description || !this.produit.fournisseur || !this.produit.coutUnitaire) {
    this.errorMessage = 'Tous les champs doivent être remplis.';
    return;
  }

  // Si tous les champs sont valides, procéder à la modification
  this.produitService.update(this.idProduit, this.produit).subscribe({
    next: () => {
      alert('Produit modifié avec succès');
      this.router.navigate(['/listProduit']);
    },
    error: (err) => {
      console.error('Erreur lors de la modification', err);
      alert('Erreur lors de la modification du produit');
    }
  });
  }
}
