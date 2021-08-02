import { Registro } from './relaciones.state';

export namespace RelacionesActions {
  export class LoadRelacionesProfEsp {
    static readonly type = '[Relaciones] Load Relaciones ProfEsp';
    constructor() {}
  }
  export class DeleteRelacionProfEsp {
    static readonly type = '[Relaciones] Delete Relacion ProfEsp';
    constructor(public idRelacion: number) {}
  }
  export class GuardarRelacionesProfEsp {
    static readonly type = '[Relaciones] Guardar Relaciones ProfEsp';
    constructor(public profesional: number, public especialidad: number) {}
  }
  export class UpdateState {
    static readonly type = '[Relaciones] Update State';
    constructor(public values: any) {}
  }
  export class Add {
    static readonly type = '[Relaciones] Add 2';
    constructor(public item: Registro) {}
  }
  export class Remove {
    static readonly type = '[Relaciones] Remove 2';
    constructor(public item: Registro) {}
  }
  export class LoadProfesionales {
    static readonly type = '[Relaciones] Load Profesionales';
    constructor(public key: string) {}
  }
  export class LoadEspecialidades {
    static readonly type = '[Relaciones] Load Especialidades';
    constructor(public key: string) {}
  }
}
