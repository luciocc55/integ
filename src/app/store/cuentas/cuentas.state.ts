import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { RolesService } from 'src/app/services/roles.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { CuentasActions } from './cuentas.actions';
export class Permisos {
  public descripcion!: string;
  public endpoint!: string;
}
export class Roles {
  public descripcion!: string;
  public permissions!: Permisos[];
}

export class CuentasStateModel {
  public token!: any;
  public searchString!: string;
  public roles?: Roles[];
  public pagination?: Pagination;
}

const defaults = {
  token: null,
  searchString: '',
};

@State<CuentasStateModel>({
  name: 'cuentas',
  defaults,
})
@Injectable()
export class CuentasState {
  constructor(
    private loginService: LoginService,
    private rolesService: RolesService
  ) {}
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
  @Action(CuentasActions.LoadRoles)
  loadRoles(
    { getState, setState }: StateContext<CuentasStateModel>,
    { page, pageSize }: CuentasActions.LoadRoles
  ) {
    const state = getState();
    return this.rolesService.getRoles(state.searchString, page, pageSize).pipe(
      tap(
        (result) => {
          const items = result.results
          delete result.results;
          setState(
            patch({ ...getState(), roles: items, pagination: { ...result } })
          );
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
