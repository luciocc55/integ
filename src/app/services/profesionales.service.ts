import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  constructor(private http: HttpClient) {}
  BusParaMerge(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.BusProfesionales,
      {
        profesional: search,
      },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
  mergeo(
    master: { origen: number; idOrigen: string },
    registros: { origen: number; idOrigen: string }[]
  ) {
    return this.http.post<any>(urls.mergeoProfesionales, {
      master,
      registros,
    });
  }
  deleteProf(id: number) {
    return this.http.post<any>(urls.profesionalesDelete, { id_registro: id });
  }
}
