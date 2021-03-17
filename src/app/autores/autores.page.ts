import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AutorService } from './autor.service';
import { Autor } from './autor_model';
import { Genero } from './genero.enum';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})

export class AutoresPage implements OnInit {

  autores: Autor[];

  constructor(
    private alertControler : AlertController,
    private autorService: AutorService
  ) { 
    this.listar(); 
  }


 ngOnInit() {}

listar(){
  this.autores=this.autorService.getAutores();
}

  confirmaExclusao(autor: Autor){
    this.alertControler.create({
      header:'Confirmação de exclusão',
      message: `Deseja excluir o autor  ${autor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(autor)
        },
        {
        text: 'Não',
        cssClass: 'danger'
        }
      ]
    }).then(alerta => alerta.present());
  }

  excluir(autor: Autor){  
    this.autorService.excluir(autor.id);
    this.listar(); 
  }

}
