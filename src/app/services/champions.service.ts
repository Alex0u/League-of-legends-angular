import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IChampion } from '../utils/interface';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  constructor(private http: HttpClient) { }

  private championsUrl = environment.apiChampions;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * @description This function fetches all champions.
   * 
   * @returns {Observable<IChampion[]>} an observable containing fetched champions.
   */
  getChampions(): Observable<IChampion[]> {
    return this.http.get<IChampion[]>(this.championsUrl).pipe(
      catchError(this.handleError<IChampion[]>('getChampions')),
    );
  }

  /**
   * @description This function fetches a champion according to a given id.
   * 
   * @param {number} id The id of the champion.
   * 
   * @returns {Observable<IChampion>} An observable containing the fetched champion.
   */
  getChampion(id: number): Observable<IChampion> {
    const url = `${this.championsUrl}/${id}`;
    return this.http.get<IChampion>(url).pipe(
      catchError(this.handleError<IChampion>(`getChampion id=${id}`)),
    );
  }

  /**
   * @description This function fetches a champion according to a given id.
   * 
   * @param {number} id The id of the champion.
   * 
   * @returns {Observable<IChampion>} An observable containing the deleted champion.
   */
  deleteChampion(id: number): Observable<IChampion> {
    const url = `${this.championsUrl}/${id}`;
    return this.http.delete<IChampion>(url, this.httpOptions).pipe(
      catchError(this.handleError<IChampion>('deleteChampion')),
    );
  }

  /**
   * @description This function adds a champion according to a given JSON object.
   * 
   * @param {IChampion} champion The champion to add.
   * 
   * @returns {Observable<IChampion>} An observable containing the added champion.
   */
  addChampion(champion: IChampion): Observable<IChampion> {
    return this.http.post<IChampion>(this.championsUrl, champion, this.httpOptions).pipe(
      catchError(this.handleError<IChampion>('addChampion')),
    );
  }

  /**
   * @description This function update a champion according to a given JSON object.
   * 
   * @param {IChampion} champion The champion to update.
   * 
   * @returns {Observable<any>} An Observable of the response as a JSON object.
   */
  updateChampion(champion: IChampion): Observable<any> {
    return this.http.put(this.championsUrl, champion, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateChampion')),
    );
  }

  /**
   * @description This function allows to handle errors.
   * 
   * @param {string} operation The operation which has lead to the error.
   * @param {T} result The result of the operation.
   * 
   * @returns {(error: any) => Observable<T>} An Observable of the response as a JSON object.
   */
  private handleError<T>(operation: string = 'operation', result?: T): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
