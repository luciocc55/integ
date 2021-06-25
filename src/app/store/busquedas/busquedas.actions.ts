export namespace BusquedasActions {
  export class BuscarProfesionales {
    static readonly type = '[Busquedas] Buscar Profesionales';
    constructor(public page: string, public pageSize: string) {}
  }
  export class UpdateSearch {
    static readonly type = '[Busquedas] Update Search';
    constructor(public newSearch: string) {}
  }
}

