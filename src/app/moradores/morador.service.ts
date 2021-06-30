import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Moradores } from './morador.model';

@Injectable({
  providedIn: 'root'
})
export class MoradoresService {
  
  private url = 'http://localhost:8080/apart-api-1.0.0/resources/moradores';

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getMoradores(): Observable<Moradores[]> {
    return this.httpClient.get<Moradores[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMorador(id: number): Observable<Moradores> {
    return this.httpClient.get<Moradores>(`${this.url}/${id}`);
  }

  private adicionar(morador: Moradores)  {
    return this.httpClient.post(this.url, morador);    
  }

  private atualizar(morador: Moradores) {
    return this.httpClient.put(`${this.url}/${morador.id}`, morador);
  }

  salvar(morador: Moradores) {
    if(morador.id) {
      return this.atualizar(morador);
    } else {
      return this.adicionar(morador);
    }
  }
}
