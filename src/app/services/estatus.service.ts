import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class EstatusService {
  constructor(private http: HttpClient) {}

  getEstatus() {
    return this.http.get<any[]>(urls.GetServices);
  }
  updateEstatus(id: number, value: boolean) {
    return this.http.post<any>(urls.updateServices + id, { habilitado: value });
  }
}
