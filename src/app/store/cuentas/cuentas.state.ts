import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { CuentasActions } from './cuentas.actions';

export class CuentasStateModel {
  public token!: any;
}

const defaults = {
  token: null,
};

@State<CuentasStateModel>({
  name: 'cuentas',
  defaults,
})
@Injectable()
export class CuentasState {
  constructor(private loginService: LoginService) {}
  @Action(CuentasActions.Login)
  login(
    { getState, setState }: StateContext<CuentasStateModel>,
    { usuario, password }: CuentasActions.Login
  ) {
    return this.loginService.login(usuario, password).pipe(
      tap(
        (result) => {
          setState(patch({ ...getState(), token: result.MergeadorToken }));
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(CuentasActions.Logout)
  Logout({ getState, setState }: StateContext<CuentasStateModel>) {
    setState(patch({ ...getState(), token: null }));
  }
}
