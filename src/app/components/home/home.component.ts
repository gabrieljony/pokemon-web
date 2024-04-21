import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  pokemonList: any[] = [];

  offset: number = 0;
  limit: number = 20;

  currentPage: number = 1;

  totalItems: number = 100;
  pages: number[] = [];

  constructor(private pokemonService: PokemonService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.updatePages();
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonList = [];
    this.loadingService.showLoading();
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe((data) => {
      setTimeout(() => {
        this.totalItems = data.count; //Total de 66 páginas pois são 1302 pokemons
        this.pokemonList = data.results.map((element: any) => {
          return {
            name: element.name,
            id: this.extractPokemonId(element.url),
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.url.split('/')[6]}.png`
          }
        });
        this.loadingService.hideLoading();
      }, 2000);
    });
  }

  updatePages(): void {
    this.pages = [];
    const totalPages = Math.ceil(this.totalItems / this.limit); // 66
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page == this.currentPage) {
      return;
    }
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.limit)) {
      this.offset = (page * this.limit) - this.limit;
      this.currentPage = page;
      this.updatePages();
      this.getPokemonList();
    }
  }

  previousPage(): void {
    console.log("offset", this.offset)
    console.log("currentPage", this.currentPage)
    if (this.offset > 1) {
      this.offset = this.offset - this.limit;
      this.currentPage--;
      this.updatePages();
      this.getPokemonList();
    }
    console.log("offset 2", this.offset)
    console.log("currentPage 2", this.currentPage)
  }

  nextPage(): void {
    console.log("offset", this.offset)
    console.log("currentPage", this.currentPage)
    if (this.offset < this.totalItems) {
      this.offset = this.offset + this.limit;
      this.currentPage++;
      this.updatePages();
      this.getPokemonList();
    }
    console.log("offset 2", this.offset)
    console.log("currentPage 2", this.currentPage)
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(Math.ceil(this.totalItems / this.limit));
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
