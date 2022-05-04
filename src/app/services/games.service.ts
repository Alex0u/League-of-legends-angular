import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGame } from '../utils/interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private gamesUrl = environment.apiGames;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**
   * @description This function fetches all games.
   * 
   * @returns {Observable<IGame[]>} an observable containing fetched games.
   */
  getGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(this.gamesUrl).pipe(
      catchError(this.handleError<IGame[]>('getGames')),
    );
  }

  /**
   * @description This function fetches a game according to a given id.
   * 
   * @param {number} id The id of the game.
   * 
   * @returns {Observable<IGame>} An observable containing the fetched game.
   */
  getGame(id: number): Observable<IGame> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<IGame>(url).pipe(
      catchError(this.handleError<IGame>(`getGame id=${id}`)),
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
