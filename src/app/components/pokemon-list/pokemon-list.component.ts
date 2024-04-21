import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.less']
})
export class PokemonListComponent {
  pokemonList: any[] = [];
  offset = 0;
  limit = 20;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  async loadPokemon() {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`;
      const response: any = await this.http.get(url).toPromise();
      this.pokemonList = this.pokemonList.concat(response.results);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const { scrollTop, clientHeight, scrollHeight } = event.target.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      this.offset += this.limit;
      this.loadPokemon();
    }
  }

  extractPokemonId(url: string): number | null {
    const match = url.match(/\/(\d+)\/$/);
    if (match) {
      const pokemonId = match[1];
      return Number(pokemonId);
    } else {
      console.log("URL inválida");
      return null; // Ou qualquer outro valor que indique que a URL é inválida
    }
  }
}
