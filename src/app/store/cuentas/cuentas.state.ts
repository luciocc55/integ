import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { GlobalActions } from '../global/global.actions';
import { ParamsState } from '../params/params.state';
import { CuentasActions } from './cuentas.actions';
export class Permisos {
  public _id!: string;
  public descripcion!: string;
  public endpoint!: string;
}
export class Roles {
  public descripcion!: string;
  public _id!: string;
  public permissions!: Permisos[];
}
export class Usuarios {
  public _id?: string;
  public role!: Roles[];
  public nombre!: string;
  public apellido!: string;
  public email!: string;
}

export class NewUsuarios {
  public password!: string;
  public role!: string;
  public nombre!: string;
  public apellido!: string;
  public email!: string;
}
export class FormUsuarios {
  public model!: NewUsuarios;
  public dirty!: boolean;
  public status!: string;
  public errors!: any;
}
export class CuentasStateModel {
  public token!: any;
  public roles?: Roles[];
  public permisos?: Permisos[];
  public rol?: Roles;
  public usuarios?: Usuarios[];
  public usuario!: string;
  public pagination?: Pagination;
  public newUsuarioForm!: FormUsuarios;
}

const defaults = {
  token: null,
  newUsuarioForm: {
    model: new NewUsuarios(),
    dirty: false,
    status: '',
    errors: { required: '' },
  },
  usuario: '',
};

@State<CuentasStateModel>({
  name: 'cuentas',
  defaults,
})
@Injectable()
export class CuentasState {
  constructor(
    private loginService: LoginService,
    private usuariosService: UsuariosService,
    private rolesService: RolesService,
    private store: Store
  ) {}
  @Action(CuentasActions.Login)
  login(
    { setState }: StateContext<CuentasStateModel>,
    { usuario, password }: CuentasActions.Login
  ) {
    return this.loginService.login(usuario, password).pipe(
      tap(
        (result) => {
          setState(patch({ token: result.MergeadorToken }));
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(CuentasActions.LoadRoles)
  loadRoles({ setState }: StateContext<CuentasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.rolesService
      .getRoles(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const items = result.results;
            delete result.results;
            setState(patch({ roles: items, pagination: { ...result } }));
          },
          (err) => {
            throw err.error?.error;
          }
        )
      );
  }
  @Action(CuentasActions.LoadAllRoles)
  LoadAllRoles({ setState }: StateContext<CuentasStateModel>) {
    return this.rolesService.getAllRoles().pipe(
      tap(
        (result) => {
          setState(patch({ roles: result }));
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }

  @Action(CuentasActions.LoadUsuarios)
  LoadUsuarios({ setState }: StateContext<CuentasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.usuariosService
      .getUsuarios(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const items = result.results;
            delete result.results;
            setState(patch({ usuarios: items, pagination: { ...result } }));
          },
          (err) => {
            throw err.error?.error;
          }
        )
      );
  }
  @Action(CuentasActions.LoadRol)
  LoadRol(
    { setState }: StateContext<CuentasStateModel>,
    { idRol }: CuentasActions.LoadRol
  ) {
    return this.rolesService.getRol(idRol).pipe(
      tap(
        (result) => {
          setState(patch({ rol: result }));
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(CuentasActions.LoadUsuario)
  LoadUsuario(
    { setState, getState }: StateContext<CuentasStateModel>,
    { idUsuario }: CuentasActions.LoadUsuario
  ) {
    const state = getState();
    return this.usuariosService.getUsuario(idUsuario).pipe(
      tap(
        (result) => {
          const newUsuarioForm: NewUsuarios = {
            email: result.email,
            password: result.password,
            role: result.role._id,
            nombre: result.nombre,
            apellido: result.apellido,
          };
          setState(
            patch({
              usuario: result._id,
              newUsuarioForm: {
                ...state.newUsuarioForm,
                model: newUsuarioForm,
              },
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }

  @Action(CuentasActions.LoadPermisos)
  LoadPermisos(
    { setState }: StateContext<CuentasStateModel>,
    { search }: CuentasActions.LoadPermisos
  ) {
    return this.rolesService.getPermisos(search).pipe(
      tap(
        (result) => {
          setState(patch({ permisos: result }));
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(CuentasActions.EditRol)
  EditRol({ getState, dispatch }: StateContext<CuentasStateModel>) {
    const state = getState();
    if (state.rol) {
      const permisos = state.rol.permissions.map((item) => item._id);
      return this.rolesService
        .editRol(state.rol?._id, state.rol?.descripcion, permisos)
        .pipe(
          tap(
            (result) => {
              dispatch(new GlobalActions.OpenSuccess('toast.successTitle'));
            },
            (err) => {
              dispatch(new GlobalActions.OpenAlert( err.error?.error || 'toast.mergeoError'));
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }
  @Action(CuentasActions.EditUsuario)
  EditUsuario({ getState, dispatch }: StateContext<CuentasStateModel>) {
    const state = getState();
    const usuario = state.newUsuarioForm.model;
    if (usuario) {
      return this.usuariosService.editarUsuario(state.usuario, usuario).pipe(
        tap(
          (result) => {
            dispatch(new GlobalActions.OpenSuccess('toast.successTitle'));
          },
          (err) => {
            dispatch(new GlobalActions.OpenAlert( err.error?.error || 'toast.mergeoError'));
            throw err.error?.error;
          }
        )
      );
    }
    return null;
  }

  @Action(CuentasActions.CreateRol)
  CreateRol({ getState, dispatch }: StateContext<CuentasStateModel>) {
    const state = getState();
    if (state.rol) {
      const permisos = state.rol.permissions.map((item) => item._id);
      return this.rolesService.createRol(state.rol?.descripcion, permisos).pipe(
        tap(
          (result) => {
            dispatch(new GlobalActions.OpenSuccess('toast.successTitle'));
          },
          (err) => {
            dispatch(new GlobalActions.OpenAlert( err.error?.error || 'toast.mergeoError'));
            throw err.error?.error;
          }
        )
      );
    }
    return null;
  }
  @Action(CuentasActions.CreateUsuario)
  CreateUsuario({ getState, dispatch }: StateContext<CuentasStateModel>) {
    const state = getState();
    if (state.newUsuarioForm.model) {
      const usuario = state.newUsuarioForm.model;
      return this.usuariosService
        .createUsuario(
          usuario.email,
          usuario.password,
          usuario.nombre,
          usuario.apellido,
          usuario.role
        )
        .pipe(
          tap(
            (result) => {
              dispatch(new GlobalActions.OpenSuccess('toast.successTitle'));
            },
            (err) => {
              dispatch(new GlobalActions.OpenAlert( err.error?.error || 'toast.mergeoError'));
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }

  @Action(CuentasActions.UpdateState)
  UpdateState(
    { setState }: StateContext<CuentasStateModel>,
    { values }: CuentasActions.UpdateState
  ) {
    setState(patch({ ...values }));
  }
  @Action(CuentasActions.AddPermiso)
  AddPermiso(
    { setState, getState }: StateContext<CuentasStateModel>,
    { permiso }: CuentasActions.AddPermiso
  ) {
    const state = getState();
    const newPermisos = [...(state.rol ? state.rol.permissions : []), permiso];
    setState(patch({ rol: { ...state.rol, permissions: newPermisos } }));
  }
  @Action(CuentasActions.RemovePermiso)
  RemovePermiso(
    { setState, getState }: StateContext<CuentasStateModel>,
    { idPermiso }: CuentasActions.RemovePermiso
  ) {
    const state = getState();
    const newPermisos = state.rol?.permissions.filter(
      (item) => item._id !== idPermiso
    );
    setState(patch({ rol: { ...state.rol, permissions: newPermisos } }));
  }
  @Action(CuentasActions.Logout)
  Logout({ setState }: StateContext<CuentasStateModel>) {
    setState(patch({ token: null }));
  }
}
