import { Injectable } from '@angular/core';
import { Autor } from './autor_model';
import { Genero } from './genero.enum';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  

  private autores: Autor[];

  constructor() {    
    this.autores = [
      {id : 1,
        nome: 'David Flanagan',
      dataNascimento: new Date(1925,7,26),
      genero: Genero.MASCULINO
      },
      {id : 2,
        nome: 'Douglas Crockford',
      dataNascimento: new Date(1955,5,25),
      genero: Genero.MASCULINO
      },
      {id : 3,
        nome: 'Martin Fowler',
      dataNascimento: new Date(1963,11,18),
      genero: Genero.MASCULINO
      }
    ];
 
  }

  public getAutores(){
   return this.autores;
  }

  excluir(id: number) {
    this.autores = this.autores.filter(a => a.id !== id); 
  }

}
