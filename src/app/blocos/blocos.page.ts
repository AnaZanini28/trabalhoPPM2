import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController,  } from '@ionic/angular'; 
import { Blocos } from './bloco.model'; 
import { BlocosService } from './bloco.service';


@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.page.html',
  styleUrls: ['./blocos.page.scss'],
})
export class BlocosPage implements OnInit {
  blocos: Blocos[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private blocoService: BlocosService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.blocoService
      .getBlocos()
      .subscribe(
        (dados) => {
          this.blocos = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(bloco: Blocos) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o bloco?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(bloco)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(bloco: Blocos) {
    this.blocoService
      .excluir(bloco.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o bloco `,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}
