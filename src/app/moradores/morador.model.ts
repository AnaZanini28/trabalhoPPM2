import { Genero } from "./genero.enum";

export class Moradores {
    id?: number;
    nome: string;
    cpf: string;
    celular: string;
    dataNascimento: Date;
    genero: Genero; 
    icone: string;
}
