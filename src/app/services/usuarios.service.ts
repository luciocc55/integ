import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuarios(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.getCuentas,
      { busqueda: search },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
  getRol(idRol: string) {
    return this.http.get<any>(urls.getRole + idRol);
  }

  editRol(idRol: string, descripcion: string, permisos: string[]) {
    return this.http.post<any>(urls.EditWPermisos + idRol, {
      descripcion,
      permisos,
    });
  }
  createRol(descripcion: string, permisos: string[]) {
    return this.http.post<any>(urls.CreateWPermisos, { descripcion, permisos });
  }
}
