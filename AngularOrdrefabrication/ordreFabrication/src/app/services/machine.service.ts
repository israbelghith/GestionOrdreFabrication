import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Machine } from './../Models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private apiUrl = 'http://localhost:9090/api/machines';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/allMachines`) // Correction du nom d'endpoint
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Machine> {
    return this.http.get<Machine>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, machine)
      .pipe(catchError(this.handleError));
  }

  update(id: number, machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/${id}`, machine)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  mettreAJourMaintenance(id: number, machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/${id}/maintenance`, machine)
      .pipe(catchError(this.handleError));
  }

  getDisponibles(dateDebut: string, dateFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibles?debut=${dateDebut}&fin=${dateFin}`)
      .pipe(catchError(this.handleError));
  }

  estOccupee(id: number, debut: string, fin: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:9090/api/ordresFabrications/machine/${id}/occupee?debut=${debut}&fin=${fin}`)
      .pipe(catchError(this.handleError));
  }

  activerMachine(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/activer`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
  if (error.status === 500) {
    console.error('Erreur serveur : ', error.message);
    return throwError(() => error); // garder l'objet original
  } else if (error.status === 409) {
    console.error('Erreur de conflit : ', error.error.message);
    return throwError(() => error); // garder l'objet original
  } else {
    console.error('Une erreur inconnue est survenue : ', error.message);
    return throwError(() => error); // garder l'objet original
  }
}

  /*private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.status === 500) {
      // Erreur serveur (500)
      console.error('Erreur serveur : ', error.message);
      return throwError('Errer Ce codeMachine existe déjà .');
    } else if (error.status === 409) {
      // Erreur mauvaise requête (400)
      errorMessage = `Erreur serveur : ${error.error.message}`;
       return throwError(() => new Error(errorMessage));
    }
     else {
      // Autres erreurs
      console.error('Une erreur inconnue est survenue : ', error.message);
      return throwError('Une erreur inconnue est survenue. Veuillez réessayer plus tard.');
    }
  }*/
}
