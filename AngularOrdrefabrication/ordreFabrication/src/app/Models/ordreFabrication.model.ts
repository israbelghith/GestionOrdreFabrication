import { Produit } from './produit.model';
import { Employe } from './employe.model';
import { Machine } from './machine.model';

export interface OrdreFabrication {
  id?: number;
  numeroOrdre: string;
  quantite: number;
  dateDebut?: Date | string;
  dateFin?: Date | string;

  statut?: string;
  //priorite?: string;
  //description?: string;
  tempsEstimeHeures: number;
  coutEstime: number;
  produit: Produit;
  employe: Employe | null;  // Permet null
  machine: Machine | null;
}
