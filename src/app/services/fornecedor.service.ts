import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './produto.service';
import { environment } from 'src/environments/environment';

export interface FornecedorDados {
  Id: string
  Nome: string
  Email: string
  Telefone: string
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http:HttpClient) { }

  listarFornecedores(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/fornecedor`);
  }
}
