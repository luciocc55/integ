import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  constructor(private http: HttpClient) {}

  ultimos() {
    return this.http.get(urls.latestPacientes);
  }
  delete(id: number) {
    return this.http.post<any>(urls.pacientesDelete, { id_registro: id });
  }
  deleteMaster(idMaster: number) {
    return this.http.get<any>(urls.removeMasterPac + idMaster + '/');
  }
  getMaster(idMaster: number) {
    return this.http.get<any>(urls.pacientesMatcheos + idMaster + '/');
  }
  match(idMaster: number, idMatch: number) {
    return this.http.post<any>(urls.pacientesMatcheos + idMaster + '/', {
      paciente: idMatch,
    });
  }
  unMatch(idMatch: number) {
    return this.http.get<any>(urls.removerPacFromMaster + idMatch + '/');
  }
  BusMatcheados(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.pacientesMatcheos,
      {
        paciente: search,
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
    return this.http.post<any>(urls.mergeoPacientes, {
      master,
      registros,
    });
  }
  BusParaMerge(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.BusPacientes,
      {
        paciente: search,
      },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
}
