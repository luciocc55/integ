import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
import { DireccionForm } from '../store/direcciones/direcciones.state';
@Injectable({
  providedIn: 'root',
})
export class DireccionesService {
  constructor(private http: HttpClient) {}

  getDirecciones(search: string, page = '1', pageSize = '25') {
    return this.http.get<any>(urls.getDirecciones, {
      params: {
        search,
        page,
        perPage: pageSize,
      },
    });
  }
  getDireccion(idDireccion: string) {
    return this.http.get<any>(urls.getDirecciones + idDireccion);
  }
  updateDireccion(idDireccion: string, data: DireccionForm) {
    return this.http.post<any[]>(urls.updateDireccion + idDireccion, data);
  }
}
