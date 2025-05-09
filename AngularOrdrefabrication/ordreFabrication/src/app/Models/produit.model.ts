import { OrdreFabrication } from './ordreFabrication.model';

export interface Produit {
  id?: number;
  codeProduit: string;
  nomProduit: string;
  categorie?: string;
  quantiteStock: number;
  description?: string;
  fournisseur?: string;
  coutUnitaire?: number;
  ordresFabrication?: OrdreFabrication[];
}
