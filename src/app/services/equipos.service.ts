import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  constructor(private http: HttpClient) {}

  ultimos() {
    return this.http.get(urls.latestEquips);
  }
  delete(id: number) {
    return this.http.post<any>(urls.equiposDelete, { id_registro: id });
  }
  deleteMaster(idMaster: number) {
    return this.http.get<any>(urls.removeMasterEquip + idMaster + '/');
  }
  getMaster(idMaster: number) {
    return this.http.get<any>(urls.equiposMatcheos + idMaster + '/');
  }
  match(idMaster: number, idMatch: number) {
    return this.http.post<any>(urls.equiposMatcheos + idMaster + '/', {
      equipo: idMatch,
    });
  }
  unMatch(idMatch: number) {
    return this.http.get<any>(urls.removerEquipFromMaster + idMatch + '/');
  }
  BusMatcheados(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.equiposMatcheos,
      {
        equipo: search,
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
    return this.http.post<any>(urls.mergeoEquipos, {
      master,
      registros,
    });
  }
  BusParaMerge(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.busEquipos,
      {
        equipo: search,
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
