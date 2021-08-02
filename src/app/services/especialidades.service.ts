import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class EspecialidadesService {
  constructor(private http: HttpClient) {}

  ultimos() {
    return this.http.get(urls.latestEsps);
  }
  delete(id: number) {
    return this.http.post<any>(urls.especialidadesDelete, { id_registro: id });
  }
  deleteMaster(idMaster: number) {
    return this.http.get<any>(urls.removeMasterEsp + idMaster + '/');
  }
  getMaster(idMaster: number) {
    return this.http.get<any>(urls.especialidadesMatcheos + idMaster + '/');
  }
  match(idMaster: number, idMatch: number) {
    return this.http.post<any>(urls.especialidadesMatcheos + idMaster + '/', {
      especialidad: idMatch,
    });
  }
  unMatch(idMatch: number) {
    return this.http.get<any>(urls.removerEspFromMaster + idMatch + '/');
  }
  BusMatcheados(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.especialidadesMatcheos,
      {
        especialidad: search,
      },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
  busAll(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.BusEspecialidadesAll,
      {
        especialidad: search,
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
    return this.http.post<any>(urls.mergeoEspecialidades, {
      master,
      registros,
    });
  }
  BusParaMerge(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.BusEspecialidades,
      {
        especialidad: search,
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
