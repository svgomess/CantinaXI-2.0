import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiBase {
  status: number
  tabela: string
  dados: VendaDados[]
}

export interface VendaDados {
  Id: string
  ValorTotal: string
  Data: string
  FkCliente: number
  FkFormaPagamento: number
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http:HttpClient) { }

  listarVendas(): Observable<ApiBase> {
    return this.http.get<ApiBase>(`${environment.baseUrl}/venda`);
  }

  totalDiario(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/venda/totalDiario`)
  }
}
