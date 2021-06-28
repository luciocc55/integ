import { Permisos } from "./cuentas.state";

export namespace CuentasActions {
  export class Login {
    static readonly type = '[Cuentas] Login';
    constructor(public password: string, public usuario: string) {}
  }
  export class UpdateState {
    static readonly type = '[Cuentas] Update State';
    constructor(public values: any) {}
  }
  export class Logout {
    static readonly type = '[Cuentas] Logout';
    constructor() {}
  }
  export class LoadRoles {
    static readonly type = '[Cuentas] Load Roles';
    constructor() {}
  }
  export class LoadAllRoles {
    static readonly type = '[Cuentas] Load All Roles';
    constructor() {}
  }
  export class LoadUsuarios {
    static readonly type = '[Cuentas] Load Usuarios';
    constructor() {}
  }
  export class LoadPermisos {
    static readonly type = '[Cuentas] Load Permisos';
    constructor(public search: string) {}
  }
  export class AddPermiso {
    static readonly type = '[Cuentas] Add Permisos';
    constructor(public permiso: Permisos) {}
  }
  export class RemovePermiso {
    static readonly type = '[Cuentas] Remove Permisos';
    constructor(public idPermiso: string) {}
  }
  export class LoadRol {
    static readonly type = '[Cuentas] Load Rol';
    constructor(public idRol: string) {}
  }
  export class EditRol {
    static readonly type = '[Cuentas] Edit Rol';
    constructor() {}
  }
  export class CreateRol {
    static readonly type = '[Cuentas] Create Rol';
    constructor() {}
  }
  export class CreateUsuario {
    static readonly type = '[Cuentas] Create Usuario';
    constructor() {}
  }
  export class LoadUsuario {
    static readonly type = '[Cuentas] Load Usuario';
    constructor(public idUsuario: string) {}
  }
}
