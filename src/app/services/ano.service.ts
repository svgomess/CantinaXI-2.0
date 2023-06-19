import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from './produto.service';
import { environment } from 'src/environments/environment';

export interface AnoDados {
  Id: string
  Nome: string
}

@Injectable({
  providedIn: 'root'
})
export class AnoService {

  constructor(private http:HttpClient) { }

  listarAnos(): Observable<ApiBase> {
    return this.http.get<ApiBase>(`${environment.baseUrl}/ano`);
  }
}
