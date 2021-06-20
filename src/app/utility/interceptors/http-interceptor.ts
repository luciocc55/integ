import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class InterceptorHttp implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.store.selectSnapshot((state) => state.cuentas.token);
    let headers: any = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    };
    if (!req.headers.has('Authorization')) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    req = req.clone({
      setHeaders: headers,
    });
    return next.handle(req);
  }
}
