import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.less']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getPokemonDetails(id);
    });
  }

  getPokemonDetails(id: number |string | null): void {
    this.pokemonService.getPokemon(id).subscribe((data) => {
      this.pokemon = data;
    });
  }

  formatNumber(num: number, length: number = 4): string {
    return ('#' + ('0000' + num).slice(-length));
  }
}
