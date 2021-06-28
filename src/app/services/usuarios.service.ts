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
  getUsuario(idUsuario: string) {
    return this.http.get<any>(urls.getCuenta + idUsuario);
  }
  createUsuario(
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    role: string
  ) {
    return this.http.post<any>(urls.crearCuenta, {
      email,
      password,
      nombre,
      apellido,
      role
    });
  }
}
