import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Genero } from '../genero.enum';
import { Moradores } from '../morador.model';
import { MoradoresService } from '../morador.service';

@Component({
  selector: 'app-moradores-cadastro',
  templateUrl: './moradores-cadastro.component.html',
  styleUrls: ['./moradores-cadastro.component.scss'],
})
export class MoradoresCadastroComponent implements OnInit {
  
  mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  
  moradorId: number;
  moradoresForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private moradorService: MoradoresService,
    private router: Router,
  ) {
    let morador = {
      id: null,
      nome: '',
      cpf: '',
      celular: '',
      dataNascimento: null,
      genero: Genero.FEMININO,
      icone: '',
    };
    this.initializaFormulario(morador);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.moradorId = parseInt(id);
      this.moradorService
        .getMorador(this.moradorId)
        .subscribe((morador) => {
          this.initializaFormulario(morador);
        });
    }
  }

  initializaFormulario(morador: Moradores) {
    this.moradoresForm = new FormGroup({
      nome: new FormControl(morador.nome, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      dataNascimento: new FormControl(morador.dataNascimento), 
      cpf: new FormControl(morador.cpf, [
        Validators.required, 
        Validators.minLength(11),
        Validators.maxLength(14),
      ]),  
      celular: new FormControl(morador.celular, [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(14),
      ]),   
      genero: new FormControl(morador.genero, Validators.required),
      icone: new FormControl(morador.icone, [
        Validators.required, 
        Validators.minLength(5), 
      ]),  
    })
  }

  salvar() {
    const morador: Moradores = {...this.moradoresForm.value, id: this.moradorId}
   morador.dataNascimento = morador.dataNascimento.toString().split('T')[0];
    this.moradorService.salvar(morador).subscribe(
      () => this.router.navigate(['moradores']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o proprietário`+erro.error ,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get nome() {
    return this.moradoresForm.get('nome');
  } 

  get cpf() {
    return this.moradoresForm.get('cpf');
  }
  
  get celular() {
    return this.moradoresForm.get('celular');
  }

  get icone() {
    return this.moradoresForm.get('icone');
  }


}
