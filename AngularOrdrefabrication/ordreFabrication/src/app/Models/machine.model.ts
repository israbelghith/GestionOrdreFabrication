import { OrdreFabrication } from './ordreFabrication.model';

export interface Machine {
  id?: number;
  codeMachine: string;
  designation: string;
  typeMachine?: string;
  etat?: string;
  dateDebutMaintenance?: string;
  dateFinMaintenance?: string;
  etatMaintenance?: string;
  ordresFabrication?: OrdreFabrication[];
}
