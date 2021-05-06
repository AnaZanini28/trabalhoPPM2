import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Autor } from 'src/app/autores/autor.model';
import { AutorService } from 'src/app/autores/autor.service';
import { LivroService } from '../livro.service';
import { Livro } from '../livros.model';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
 
  autores: Autor[];
  livroId: number;
  livrosForm: FormGroup;

  constructor( 
    private autorService: AutorService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livrosService: LivroService
  ) { 
      let livro = {
        id: null,
        titulo: '',
        isbn: 0,
        paginas: 0,
        autores: null,
        preco: 0,
        foto:''
      }
      this.initializaFormulario(livro);
  }
 
  ionViewWillEnter() { 
    this.listar();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.livroId = parseInt(id);
      this.livrosService
        .getLivro(this.livroId)
        .subscribe((livro) => {
          this.initializaFormulario(livro);
        });
    }
  }

  initializaFormulario(livro: Livro){
    this.livrosForm = new FormGroup({
        titulo: new FormControl(
              livro.titulo, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150),  
        ]),      
        isbn: new FormControl(livro.isbn, Validators.required),
        paginas: new FormControl(livro.paginas, Validators.required),
        autores: new FormControl(livro.autores),
        preco: new FormControl(livro.preco, Validators.required),
        foto: new FormControl(livro.foto, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),  
      ]) 
    })
  } 

  salvar(){
    const livro: Livro = {...this.livrosForm.value,
                id: this.livroId }

          this.livrosService.salvar(livro).subscribe(
            () => this.router.navigate(['livros']),
            (erro) => {
              console.error(erro);
              this.toastController.create({
                message: `Não foi possível salvar o livro ${livro.titulo}`,
                duration: 5000,
                keyboardClose: true,
                color: 'danger'
              }).then(t => t.present());
            }
          );
     } 

    get titulo(){
        return this.livrosForm.get('titulo');
    }

    get foto(){
      return this.livrosForm.get('foto');
    }
    
    get preco(){
      return this.livrosForm.get('preco');
    }

    get paginas(){
      return this.livrosForm.get('paginas');
    }
    get isbn(){
      return this.livrosForm.get('isbn');
    }

  listar() {
    this.autorService
      .getAutores()
      .subscribe(
        (dados) => {
          this.autores = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

}
