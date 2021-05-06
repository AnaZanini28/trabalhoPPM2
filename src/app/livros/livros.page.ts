import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular'; 
import { LivroService } from './livro.service';
import { Livro } from './livros.model';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {

  livros: Livro[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private livroService: LivroService ) {   
    }

    ionViewWillEnter() { 
      this.listar();
    }
  
  ngOnInit() {
  }
  
  listar(){
    this.livroService
      .getLivros()
      .subscribe(
        (dados) =>{
          this.livros = dados;
        }, 
        (erro) =>{
          console.error(erro);
        }
      );
  }
  
  confirmarExclusao(livro: Livro){
    this.alertController.create({
        header: 'Confirmar a exclusão',
        message: `Deseja excluir o livro ${livro.titulo}`,
        buttons:[
          {
              text: 'Sim',
              handler:() => this.excluir(livro)
          },
          {
            text: 'Não',
          }
        ]
    } ).then(alerta => alerta.present());
  }

  private excluir(livro: Livro){
    this.livroService
      .excluir(livro.id)
      .subscribe( 
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
              message: `Não foi possivel excluir o livro  ${livro.titulo}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger'
            }).then(t => t.present());
        }
      );
  }  
}
