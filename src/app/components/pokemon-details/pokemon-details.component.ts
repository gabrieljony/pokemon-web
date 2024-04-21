import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PokemonColors } from 'src/app/models/PokemonColors';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.less']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  cor1?: string;
  cor2?: string;
  colors: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getPokemonDetails(id);
    });
    this.colors = PokemonColors;
  }

  getPokemonDetails(id: number | string | null): void {
    this.pokemonService.getPokemon(id).subscribe((data) => {
      this.pokemon = data;
      this.cor1 = this.colors[this.pokemon.types[0].type.name]
      this.cor2 = this.pokemon.types[1] ? this.colors[this.pokemon.types[1].type.name] : '#ffffff';
      });
  }

  formatNumber(num: number, length: number = 4): string {
    return ('#' + ('0000' + num).slice(-length));
  }
}
