import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class EstudiosService {
  constructor(private http: HttpClient) {}

  ultimos() {
    return this.http.get(urls.latestEsts);
  }
  delete(id: number) {
    return this.http.post<any>(urls.estudiosDelete, { id_registro: id });
  }
  deleteMaster(idMaster: number) {
    return this.http.get<any>(urls.removeMasterEst + idMaster + '/');
  }
  getMaster(idMaster: number) {
    return this.http.get<any>(urls.estudiosMatcheos + idMaster + '/');
  }
  match(idMaster: number, idMatch: number) {
    return this.http.post<any>(urls.estudiosMatcheos + idMaster + '/', {
      estudio: idMatch,
    });
  }
  unMatch(idMatch: number) {
    return this.http.get<any>(urls.removerEstFromMaster + idMatch + '/');
  }
  busAll(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.BusEstudiosAll,
      {
        estudio: search,
      },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
  BusMatcheados(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.estudiosMatcheos,
      {
        estudio: search,
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
    return this.http.post<any>(urls.mergeoEstudios, {
      master,
      registros,
    });
  }
  BusParaMerge(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.busEstudios,
      {
        estudio: search,
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
