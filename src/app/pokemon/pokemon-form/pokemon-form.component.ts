import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon.models';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styles: [
  ]
})
export class PokemonFormComponent {
  @Input() pokemon: Pokemon|undefined;
  types: string[] = [];

  constructor(public pokemonService: PokemonService, public router: Router){}

  ngOnInit(): void {
    this.types = this.pokemonService.getTypesList()
  }

  /* Cette fonction permet de déterminer si le pokémon en cours d'édition possède le type passé en paramètre */
  hasType(type: string ): boolean {
    return this.pokemon?.types.includes(type) || false;
  }

  /* Cette fonction permet d'ajouter le type passé en paramètre sur le pokemon en cours d'edition, si le type etait déjà affecté au pokemon il sera retiré de celui ci */
  selectType($event: Event, type: string): void {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    
    /* Si la case a été coché */
    if(isChecked){
      this.pokemon?.types.push(type)
    }else{
      const index = this.pokemon?.types.indexOf(type);
      if(index){
        this.pokemon?.types.splice(index, 1);
      }
    }
    
  }

  onSubmit() {
    if(this.pokemon){
      this.pokemonService.updatePokemon(this.pokemon)
      .subscribe(() => {
        this.router.navigate(['/pokemons']) 
      })
    }
  }
}
