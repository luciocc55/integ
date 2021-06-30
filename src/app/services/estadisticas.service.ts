

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  constructor(private http: HttpClient) {}

  estadisticasEquipos() {
    return this.http.get(urls.estadisticasEquip);
  }
  estadisticasProfesionales() {
    return this.http.get(urls.estadisticasProf);
  }
  estadisticasPacientes() {
    return this.http.get(urls.estadisticasPac);
  }
  estadisticasOs() {
    return this.http.get(urls.estadisticasOs);
  }
  estadisticasEspecialidades() {
    return this.http.get(urls.estadisticasEsp);
  }
  estadisticasEstudios() {
    return this.http.get(urls.estadisticasEst);
  }
  estadisticasDirecciones() {
    return this.http.get(urls.direccionesEstadisticas);
  }

}
