import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { Apartamentos } from './apartamento.model';

@Injectable({
  providedIn: 'root'
})
export class ApartamentosService {
  
  private url = 'http://localhost:3000/apartamentos';

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getApartamentos(): Observable<Apartamentos[]> {
    return this.httpClient.get<Apartamentos[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getApartamento(id: number): Observable<Apartamentos> {
    return this.httpClient.get<Apartamentos>(`${this.url}/${id}`);
  }

  private adicionar(apartamento: Apartamentos)  {
    return this.httpClient.post(this.url, apartamento);    
  }

  private atualizar(apartamento: Apartamentos) {
    return this.httpClient.put(`${this.url}/${apartamento.id}`, apartamento);
  }

  salvar(apartamento: Apartamentos) {
    if(apartamento.id) {
      return this.atualizar(apartamento);
    } else {
      return this.adicionar(apartamento);
    }
  }
}
