import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  private apiBaseUrl = 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`)
    }
    return headers;
  }

  private prepareOptions(): {headers:HttpHeaders} {
    return {headers: this.getHeaders()};
  }
  /**
   * Récupère une liste de tous les Pokémon depuis le serveur.
   * @returns Un Observable (un carton) qui émet un tableau d'objets Pokémon.
   * Cette fonction effectue une requête HTTP GET vers le point de terminaison API spécifié ('api/pokemons').
   * L'utilisation de `pipe` permet de traiter les données dès qu'elles arrivent :
   * - `tap` est utilisé pour afficher les données reçues (comme si on regardait à l'intérieur du carton sans prendre les objets).
   * - `catchError` est utilisé pour gérer les erreurs lors de la requête. En cas d'erreur, on affiche celle-ci et on renvoie un nouveau carton vide (tableau vide).
   */
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiBaseUrl}/api/pokemons`,this.prepareOptions()).pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }
  /**
   * Récupère un Pokémon spécifique par son identifiant depuis le serveur.
   * @param pokemonId L'identifiant du Pokémon à récupérer.
   * @returns Un Observable (un carton) qui émet un objet Pokémon ou `undefined` si non trouvé.
   * Cette fonction effectue une requête HTTP GET à un point de terminaison API formé en ajoutant l'ID du Pokémon à l'URL.
   * - `tap` est utilisé pour afficher les données du Pokémon récupéré (comme si on ouvrait le carton pour montrer l'objet).
   * - `catchError` est utilisé pour gérer les erreurs lors de la requête. En cas d'erreur, on affiche celle-ci et on renvoie un carton contenant `undefined`.
  */
  getPokemonById(pokemonId: string): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`${this.apiBaseUrl}/api/pokemons/${pokemonId}`,this.prepareOptions()).pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )
  }

  updatePokemon(updatedPokemon: Pokemon): Observable<null|undefined> {
    return this.http.put<null>(`${this.apiBaseUrl}/api/pokemons/${updatedPokemon._id}`, updatedPokemon,this.prepareOptions()).pipe(
      tap( (response) => console.table(response) ),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )

  }

  getTypesList(): string[] {
    return [
      'Feu', 
      'Eau', 
      'Plante',
      'Insecte',
      'Normal',
      'Vol',
      'Poison',
      'Fée',
      'Psy',
      'Electrik',
      'Combat'
    ]
  }
}
