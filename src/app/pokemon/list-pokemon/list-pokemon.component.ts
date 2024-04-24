import { Component } from '@angular/core';
import { Pokemon } from '../pokemon.models';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: [
  ]
})
export class ListPokemonComponent {
  pokemonList: Pokemon[] = [];
  pokemonSelected: Pokemon|undefined

  constructor(private router: Router, public pokemonService: PokemonService) {}

  ngOnInit(){
    this.pokemonService.getPokemonList()
    .subscribe(pokemons => this.pokemonList = pokemons)
    console.log(this.pokemonList);
  }

  selectPokemon(PokemonName: string): void {
  }

  goToDetail(pokemon: Pokemon){
    //On recupere l'id du pokemon passé en parametre
    const id:string = pokemon._id;
    //On navigue vers le details du pokemon en question 
    this.router.navigate(['pokemon/', id]);
  }
}
