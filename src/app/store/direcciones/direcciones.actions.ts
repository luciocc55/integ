export namespace DireccionesActions {
  export class LoadDirecciones {
    static readonly type = '[Direcciones] Load Direcciones';
    constructor() {}
  }
  export class LoadDireccion {
    static readonly type = '[Direcciones] Load Direccion';
    constructor(public idDireccion: string) {}
  }
  export class EditarDireccion {
    static readonly type = '[Direcciones] Editar Direccion';
    constructor() {}
  }
}

