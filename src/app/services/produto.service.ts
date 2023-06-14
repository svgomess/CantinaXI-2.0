import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiBase {
  status: number
  tabela: string
  dados: ProdutoDados[]
}

export interface ProdutoDados {
  Id: string
  Nome: string
  Preco: string
  QtdEstoque: string
  FkUsuario: string
  FkFornecedor: string
  Fornecedor: string
  FkCategoria: number
  Categoria: string
  FkImagem: number
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<ApiBase> {
    return this.http.get<ApiBase>(`${environment.baseUrl}/produto`);
  }

  mostrarProduto(id: number) {
    return this.http.get<ApiBase>(`${environment.baseUrl}/produto/${id}`);
  }
  
  inserirProduto(dados: any) {
    return this.http.post(`${environment.baseUrl}/produto/inserir`, dados).subscribe(res => (console.log(res)));
  }

  atualizarProduto(id: number, campo: string, alteracao: any) {
    return this.http.get(`${environment.baseUrl}/produto/${id}/atualizar/${campo}/${alteracao}`).subscribe(res => (console.log(res)));
  }
}
