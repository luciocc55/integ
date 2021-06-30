import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class ObrasSocialesService {
  constructor(private http: HttpClient) {}

  ultimos() {
    return this.http.get(urls.latestOs);
  }
  delete(id: number) {
    return this.http.post<any>(urls.osDelete, { id_registro: id });
  }
  deleteMaster(idMaster: number) {
    return this.http.get<any>(urls.removeMasterOs + idMaster + '/');
  }
  getMaster(idMaster: number) {
    return this.http.get<any>(urls.osMatcheos + idMaster + '/');
  }
  match(idMaster: number, idMatch: number) {
    return this.http.post<any>(urls.osMatcheos + idMaster + '/', {
      os: idMatch,
    });
  }
  unMatch(idMatch: number) {
    return this.http.get<any>(urls.removerOsFromMaster + idMatch + '/');
  }
  BusMatcheados(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.osMatcheos,
      {
        os: search,
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
    return this.http.post<any>(urls.mergeoOs, {
      master,
      registros,
    });
  }
  BusParaMerge(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.Busos,
      {
        os: search,
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
