import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as urls from './url-backend';
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(search: string, page = '1', pageSize = '25') {
    return this.http.post<any>(
      urls.getRoles,
      { busqueda: search },
      {
        params: {
          page,
          perPage: pageSize,
        },
      }
    );
  }
}
