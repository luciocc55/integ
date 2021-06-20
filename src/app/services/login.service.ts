import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  //////////
  // Loguea al usuario y crea los datos de la sesion
  login(username: string, password: string) {
    return this.http.post<any>(urls.login, {
      email: username,
      password: password,
    });
  }
}
