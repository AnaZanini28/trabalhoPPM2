import { Autor } from "../autores/autor.model";

 export class Livro {
    id?: number;
    titulo: string; 
    isbn: number; 
    paginas: number; 
    autores: Autor;
    preco: number;
    foto: string;
}
