import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Blocos } from '../bloco.model';
import { BlocosService } from '../bloco.service';

@Component({
  selector: 'app-blocos-cadastro',
  templateUrl: './blocos-cadastro.component.html',
  styleUrls: ['./blocos-cadastro.component.scss'],
})
export class BlocosCadastroComponent implements OnInit { 

  blocoId: number;
  blocosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private blocosService: BlocosService,
    private router: Router,
  ) {
    let bloco = {
      id: null, 
      numero: '',
      qtd: 0,
      garagem: '',
      sindico: '', 
      pet: '',
    };
    this.initializaFormulario(bloco);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.blocoId = parseInt(id);
      this.blocosService
        .getBloco(this.blocoId)
        .subscribe((bloco) => {
          this.initializaFormulario(bloco);
        });
    }
  }

  initializaFormulario(bloco: Blocos) {
    this.blocosForm = new FormGroup({  
      numero: new FormControl(bloco.numero, [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),   
      qtd: new FormControl(bloco.qtd, Validators.required),
      sindico: new FormControl(bloco.sindico, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),   
      garagem: new FormControl(bloco.garagem), 
      pet: new FormControl(bloco.pet),
    })
  }

  salvar() {
    const bloco: Blocos = {...this.blocosForm.value, id: this.blocoId}
    this.blocosService.salvar(bloco).subscribe(
      () => this.router.navigate(['blocos']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o bloco `,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get numero() {
    return this.blocosForm.get('numero');
  } 
  
  get sindico() {
    return this.blocosForm.get('sindico');
  }

}
