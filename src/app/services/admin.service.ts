import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LoginBase {
  status: number
  tabela: string
  dados: UsuarioDados
}

export interface AdminDados {
  Nome: string
  Senha: string
}

export interface UsuarioDados {
  Login: string
  Nome: string
  Senha: string
  Email: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  retornarAdmin(): Observable<AdminDados> {
    return this.http.get<AdminDados>(`${environment.baseUrl}/usuario/admin`);
  }

  listarVendedores(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/usuario/vendedores`);
  }

  registrarVendedor(dados: any) {
    return this.http.post(`${environment.baseUrl}/usuario/vendedores/inserir`, dados).subscribe(res => (console.log(res)));
  }

  buscarVendedor(login: any) {
    return this.http.get<LoginBase>(`${environment.baseUrl}/usuario/vendedores/${login}`);
  }
  
  removerVendedor(login: number) {
    return this.http.get<LoginBase>(`${environment.baseUrl}/deletar/usuario/vendedores/${login}`).subscribe(res => (console.log(res)));
  }
}
