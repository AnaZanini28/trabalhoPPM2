import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular'; 
import { Apartamentos } from './apartamento.model';
import { ApartamentosService } from './apartamento.service';

@Component({
  selector: 'app-apartamentos',
  templateUrl: './apartamentos.page.html',
  styleUrls: ['./apartamentos.page.scss'],
})
export class ApartamentosPage implements OnInit {

  apartamentos: Apartamentos[];

  constructor( 
    private alertController: AlertController,
    private toastController: ToastController,
    private apartamentoService:  ApartamentosService
  ) { }

  ionViewWillEnter() { 
    this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this.apartamentoService
      .getApartamentos()
      .subscribe(
        (dados) => {
          this.apartamentos = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }
     
  confirmarExclusao(apartamento: Apartamentos) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o apartamento ${apartamento.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(apartamento)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(apartamento: Apartamentos) {
    this.apartamentoService
      .excluir(apartamento.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o apartamento ${apartamento.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}
