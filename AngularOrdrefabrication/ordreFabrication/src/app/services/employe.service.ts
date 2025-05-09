import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employe } from '../Models/employe.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiUrl = 'http://localhost:9090/api/employes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/allEmployes`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(this.apiUrl, employe)
      .pipe(catchError(this.handleError));
  }

  update(id: number, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/${id}`, employe)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getDisponibles(dateDebut: string, dateFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibles?debut=${dateDebut}&fin=${dateFin}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    // Vérifier si c'est une erreur du serveur
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.status === 409 && error.error && error.error.message) {
        // Si le serveur renvoie un message spécifique dans l'erreur
        errorMessage = `Erreur serveur : ${error.error.message}`;
      } else {
        // Message générique d'erreur serveur
        errorMessage = `Erreur serveur: ${error.status}, message: ${error.message}`;
      }
    }

    // Retourner l'erreur via throwError pour la propager
    return throwError(() => new Error(errorMessage));
  }

}
