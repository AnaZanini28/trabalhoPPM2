import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Blocos } from 'src/app/blocos/bloco.model';
import { BlocosService } from 'src/app/blocos/bloco.service';   
import { Moradores } from 'src/app/moradores/morador.model';  
import { MoradoresService } from 'src/app/moradores/morador.service';
import { Apartamentos } from '../apartamento.model';
import { ApartamentosService } from '../apartamento.service';

@Component({
  selector: 'app-apartamentos-cadastro',
  templateUrl: './apartamentos-cadastro.component.html',
  styleUrls: ['./apartamentos-cadastro.component.scss'],
})
export class ApartamentosCadastroComponent implements OnInit {

  moradores: Moradores[]; 
  blocos: Blocos[];

  apartamentoId: number;
  apartamentosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private apartamentoService: ApartamentosService,
    private moradorService: MoradoresService,
    private blocoService: BlocosService,
    private router: Router,
  ) {
    let apartamento = {
      id: null,
      nome: '',
      bloco: '',
      numero: 0,  
      pessoas: 1,   
      pet: '', 
      qual: ''   
    };
    this.initializaFormulario(apartamento);
  }
  
  ionViewWillEnter() { 
    this.listarMorador();
    this.listarBloco();
  }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.apartamentoId = parseInt(id);
      this.apartamentoService
        .getApartamento(this.apartamentoId)
        .subscribe((apartamento) => {
          this.initializaFormulario(apartamento);
        });
    }
  }

  initializaFormulario(apartamento: Apartamentos) {
    this.apartamentosForm = new FormGroup({
      nome: new FormControl(apartamento.nome, Validators.required), 
      bloco: new FormControl(apartamento.bloco, Validators.required),  
      numero: new FormControl(apartamento.numero, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(15),
      ]), 
      pessoas: new FormControl(apartamento.pessoas, Validators.required), 
      pet: new FormControl(apartamento.pet, Validators.required), 
      qual: new FormControl(apartamento.qual), 
    })
  }   
  
  salvar() {
    const apartamento: Apartamentos = {...this.apartamentosForm.value, id: this.apartamentoId}
    this.apartamentoService.salvar(apartamento).subscribe(
      () => this.router.navigate(['apartamentos']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o apartamento`+erro.error,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get nome() {
    return this.apartamentosForm.get('nome');
  }
 
  listarMorador() {
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

  listarBloco() {
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

  get numero() {
    return this.apartamentosForm.get('numero');
  } 

  get pessoas() {
    return this.apartamentosForm.get('pessoas');
  } 

}
