import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { OrdreFabrication } from '../Models/ordreFabrication.model';

@Injectable({
  providedIn: 'root'
})
export class OrdreFabricationService {
  private apiUrl = 'http://localhost:9090/api/ordresFabrications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${this.apiUrl}/allOrdres`)
      .pipe(catchError(this.handleError));
  }

  create(ordreFabrication: OrdreFabrication): Observable<OrdreFabrication> {
    return this.http.post<OrdreFabrication>(this.apiUrl, ordreFabrication)
      .pipe(catchError(this.handleError));
  }

  getOrdreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateOrdre(id: number, ordre: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ordre)
      .pipe(catchError(this.handleError));
  }

  affecterMachineEtEmploye(ordreId: number, employeId: number, machineId: number): Observable<any> {
    const body = { employeId, machineId };
    return this.http.put<any>(`${this.apiUrl}/${ordreId}/affectation`, body)
      .pipe(catchError(this.handleError));
  }

  getByStatut(statut: string): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${this.apiUrl}/statut/${statut}`)
      .pipe(catchError(this.handleError));
  }

  rechercherMultiCritere(params: any): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${this.apiUrl}/recherche`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Une erreur est survenue';

  if (error.error instanceof ErrorEvent) {
    // Erreur côté client
    errorMessage = `Erreur client : ${error.error.message}`;
  } else {
    // Erreur côté serveur avec réponse JSON
    if (error.error && error.error.message) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Cas d'erreur non formatée ou en texte brut
      errorMessage = `Erreur serveur : ${error.status} - ${error.message}`;
    }
  }

  console.error('Détails erreur :', error);
  return throwError(() => new Error(errorMessage));
}


  /*private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur: ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }*/
}
