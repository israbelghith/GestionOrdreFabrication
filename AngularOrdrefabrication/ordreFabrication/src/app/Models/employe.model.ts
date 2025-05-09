import { OrdreFabrication } from './ordreFabrication.model';

export interface Employe {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  ordresFabrication?: OrdreFabrication[]; // optionnel pour éviter les boucles infinies
}
