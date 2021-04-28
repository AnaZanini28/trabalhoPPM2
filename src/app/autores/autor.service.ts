import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { Genero } from './genero.enum';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
 
  private autores: Autor[];

  constructor() { 
    this.autores = [
      {
        id: 1,
        nome: 'David Flanagan',
        dataNascimento: new Date(1985, 10, 24),
        genero: Genero.MASCULINO,
      }, 
      {
        id: 2,
        nome: 'Douglas Crockford',
        dataNascimento: new Date(1955, 5, 17),
        genero: Genero.MASCULINO,
      },
      {
        id: 3,
        nome: 'Martin Fowler',
        dataNascimento: new Date(1963, 12, 18),
        genero: Genero.MASCULINO
      }
    ];
  }
  
  getAutores() {
    return this.autores;
  }

  excluir(id: number) {
    this.autores = this.autores.filter(a => a.id !== id);
  }

  getAutor(id: number): Autor {
    return this.autores.find(a => a.id === id);
  }
}
