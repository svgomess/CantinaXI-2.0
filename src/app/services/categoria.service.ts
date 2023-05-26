import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './produto.service';
import { environment } from 'src/environments/environment';

export interface CategoriaDados {
  Id: string
  Nome: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  listarCategorias(): Observable<ApiBase> {
    return this.http.get<ApiBase>(`${environment.baseUrl}/categoriaproduto`);
  }

  selecionarCategoria(id: string) {
    return this.http.get<ApiBase>(`${environment.baseUrl}/categoriaproduto/${id}`)
  }

  adicionarCategoria(dados: any) {
    return this.http.post(`${environment.baseUrl}/categoriaproduto/inserir`, dados).subscribe(res => (console.log(res)));
  }
}
