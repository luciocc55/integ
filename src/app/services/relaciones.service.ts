import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class RelacionesService {
  constructor(private http: HttpClient) {}
  busRelacionesProfEsp(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.busquedaProfEsp,
      {
        busqueda: search,
      },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
  busRelacionesEquipEst(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.busquedaEquipEst,
      {
        busqueda: search,
      },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
  deleteProfEsp(idRelacion: number) {
    return this.http.post<any>(urls.removerProfEsp, {
      id: idRelacion,
    });
  }
  deleteEquipEst(idRelacion: number) {
    return this.http.post<any>(urls.removerEquipEst, {
      id: idRelacion,
    });
  }
  guardarProfEsp(nuevaRelacion: {profesional: number, especialidad: number}) {
    return this.http.post<any>(urls.agregarProfEsp, nuevaRelacion);
  }
  guardarEquipEst(nuevaRelacion: {equipo: number, estudio: number}) {
    return this.http.post<any>(urls.agregarEquipEst, nuevaRelacion);
  }
}
