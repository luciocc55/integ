export namespace CuentasActions {
  export class Login {
    static readonly type = '[Cuentas] Login';
    constructor(public password: string, public usuario: string) {}
  }
  export class Logout {
    static readonly type = '[Cuentas] Logout';
    constructor() {}
  }
}
