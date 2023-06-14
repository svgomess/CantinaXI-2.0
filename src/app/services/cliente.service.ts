import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ClienteDados {
  Id: string
  Nome: string
  Categoria: string
  Periodo: string
  FkAno: string
  Saldo: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
  
  listarClientes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/cliente`);
  }
}
