import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { Blocos } from './bloco.model';

@Injectable({
  providedIn: 'root'
})
export class BlocosService {
  
  private url = 'http://localhost:3000/blocos';

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getBlocos(): Observable<Blocos[]> {
    return this.httpClient.get<Blocos[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getBloco(id: number): Observable<Blocos> {
    return this.httpClient.get<Blocos>(`${this.url}/${id}`);
  }

  private adicionar(bloco: Blocos)  {
    return this.httpClient.post(this.url, bloco);    
  }

  private atualizar(bloco: Blocos) {
    return this.httpClient.put(`${this.url}/${bloco.id}`, bloco);
  }

  salvar(bloco: Blocos) {
    if(bloco.id) {
      return this.atualizar(bloco);
    } else {
      return this.adicionar(bloco);
    }
  }
}
