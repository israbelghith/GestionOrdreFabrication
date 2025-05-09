import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeComponent } from './employes/employe/employe.component';
import { AjouterEmployeComponent } from './employes/ajouter-employe/ajouter-employe.component';
import { ModifierEmployeComponent } from './employes/modifier-employe/modifier-employe.component';
import { MachineComponent } from './machines/machine/machine.component';


import { AjouterMachineComponent } from './machines/ajouter-machine/ajouter-machine.component';
import { ModifierMachineComponent } from './machines/modifier-machine/modifier-machine.component';
import { MettreAjourMachineComponent } from './machines/mettre-ajour-machine/mettre-ajour-machine.component';
import { ProduitComponent } from './produits/produit/produit.component';
import { AjouterProduitComponent } from './produits/ajouter-produit/ajouter-produit.component';
import { ModifierProduitComponent } from './produits/modifier-produit/modifier-produit.component';
import { OrdreFabricationComponent } from './ordreFabrications/ordre-fabrication/ordre-fabrication.component';
import { AjouterOrdreComponent } from './ordreFabrications/ajouter-ordre/ajouter-ordre.component';
import { ModifierOrdreComponent } from './ordreFabrications/modifier-ordre/modifier-ordre.component';
import { AffectationOrdreComponent } from './ordreFabrications/affectation-ordre/affectation-ordre.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'nav', component: NavbarComponent },
  { path: '', component: HomeComponent }, // page d'accueil
  { path: 'listEmploye', component: EmployeComponent },
  { path: 'listEmploye/ajoutEmploye', component: AjouterEmployeComponent },
  { path: 'listEmploye/modifierEmploye/:id', component: ModifierEmployeComponent },

  //machin e path
  { path: 'listMachine', component: MachineComponent },
  { path: 'listMachine/ajoutMachine', component: AjouterMachineComponent },
  { path: 'listMachine/modifierMachine/:id', component: ModifierMachineComponent },
  { path: 'listMachine/maintenance/:id', component: MettreAjourMachineComponent },

  //produits
  { path: 'listProduit', component: ProduitComponent },
  { path: 'listProduit/ajoutProduit', component: AjouterProduitComponent },
  { path: 'listProduit/ModifierProduit/:id', component: ModifierProduitComponent },

  //ordrefabrication
  { path: 'listOrdre', component: OrdreFabricationComponent },
  { path: 'listOrdre/ajoutOrdre', component: AjouterOrdreComponent },
  { path: 'listOrdre/ModifierOrdre/:id', component: ModifierOrdreComponent },
  { path: 'listOrdre/affectation/:id', component: AffectationOrdreComponent },
];
