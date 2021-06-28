import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class DireccionesService {
  constructor(private http: HttpClient) {}

  getDirecciones(search: string, page = '1', pageSize = '25') {
    return this.http.get<any>(
      urls.getDirecciones,
      {
        params: {
          search,
          page,
          perPage: pageSize,
        },
      }
    );
  }
}
