import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController,  } from '@ionic/angular'; 
import { Moradores } from './morador.model';
import { MoradoresService } from './morador.service';


@Component({
  selector: 'app-moradores',
  templateUrl: './moradores.page.html',
  styleUrls: ['./moradores.page.scss'],
})
export class MoradoresPage implements OnInit {
  moradores: Moradores[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private moradorService: MoradoresService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.moradorService
      .getMoradores()
      .subscribe(
        (dados) => {
          this.moradores = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(morador: Moradores) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o morador ${morador.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(morador)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(morador: Moradores) {
    this.moradorService
      .excluir(morador.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o morador ${morador.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}
