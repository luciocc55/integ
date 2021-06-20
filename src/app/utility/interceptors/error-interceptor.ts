import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GlobalActions } from 'src/app/store/global/global.actions';
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(new GlobalActions.ShowLoader());
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(new GlobalActions.HideLoader());
        return throwError(error);
      }),
      finalize(() => {
        this.store.dispatch(new GlobalActions.HideLoader());
      })
    );
  }
}
