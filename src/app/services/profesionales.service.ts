import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  constructor(private http: HttpClient) {}
  BusMatcheados(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.profesionalesMatcheos,
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
  unMatchProf(profesional: number) {
    return this.http.get<any>(urls.removerProfFromMaster + profesional + '/');
  }
  getMaster(idMaster: number) {
    return this.http.get<any>(urls.profesionalesMatcheos + idMaster + '/');
  }
  deleteMaster(idMaster: number) {
    return this.http.get<any>(urls.removeMasterProf + idMaster + '/');
  }
  matchProf(idMaster: number, idMatch: number) {
    return this.http.post<any>(urls.profesionalesMatcheos + idMaster + '/', {
      profesional: idMatch,
    });
  }
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
  delete(id: number) {
    return this.http.post<any>(urls.profesionalesDelete, { id_registro: id });
  }
  ultimos() {
    return this.http.get(urls.latestProfs);
  }
}
