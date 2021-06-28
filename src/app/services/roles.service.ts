import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.getRoles,
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
  getPermisos(busqueda: string) {
    return this.http.post<any>(urls.getPermisos, { busqueda });
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
