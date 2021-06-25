export namespace EstatusActions {
  export class LoadEstatus {
    static readonly type = '[Estatus] Load Estatus';
    constructor() {}
  }
  export class UpdateEstatus {
    static readonly type = '[Estatus] Update Estatus';
    constructor(public estatus: number, public value: boolean) {}
  }
}
