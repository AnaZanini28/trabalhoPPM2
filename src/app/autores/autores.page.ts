import { Component, OnInit } from '@angular/core';
import { Autor } from './autor_model';
import { Genero } from './genero.enum';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: Autor[];

  constructor() { 
    this.autores = [
      {nome: 'David Flanagan',
      dataNascimento: new Date(1925,7,26),
      genero: Genero.MASCULINO
      },
      {nome: 'Douglas Crockford',
      dataNascimento: new Date(1955,5,25),
      genero: Genero.MASCULINO
      },
      {nome: 'Martin Fowler',
      dataNascimento: new Date(1963,11,18),
      genero: Genero.MASCULINO
      }
    ];
  }

  ngOnInit() {
  }

}
