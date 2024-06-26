import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient
  ) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemon(id: number |string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getColors(): Observable<any> {
    return this.http.get<any>('./../../../assets/cores.json');
  }
}
