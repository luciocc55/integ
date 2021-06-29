import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  taskProfesionales() {
    return this.http.get<any>(urls.profesionalesTask);
  }

  taskEspecialidades() {
    return this.http.get<any>(urls.especialidadesTask);
  }
  taskDirecciones() {
    return this.http.get<any>(urls.direccionesTask);
  }
  taskEstudios() {
    return this.http.get<any>(urls.estudiosTask);
  }
  taskEquipos() {
    return this.http.get<any>(urls.equiposTask);
  }
  taskProfEsp() {
    return this.http.get<any>(urls.profespTask);
  }
}
