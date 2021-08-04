import { Registro } from './relaciones.state';

export namespace RelacionesActions {
  export class LoadRelacionEquipEst {
    static readonly type = '[Relaciones] Load Relaciones EquipEst';
    constructor() {}
  }
  export class LoadRelacionesProfEsp {
    static readonly type = '[Relaciones] Load Relaciones ProfEsp';
    constructor() {}
  }
  export class DeleteRelacionEquipEst {
    static readonly type = '[Relaciones] Delete Relacion EquipEst';
    constructor(public idRelacion: number) {}
  }
  export class DeleteRelacionProfEsp {
    static readonly type = '[Relaciones] Delete Relacion ProfEsp';
    constructor(public idRelacion: number) {}
  }
  export class GuardarRelacionesEquipEst {
    static readonly type = '[Relaciones] Guardar Relaciones EquipEst';
    constructor(public equipo: number, public estudio: number) {}
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
  export class LoadEquipos {
    static readonly type = '[Relaciones] Load Equipos';
    constructor(public key: string) {}
  }
  export class LoadEstudios {
    static readonly type = '[Relaciones] Load Estudios';
    constructor(public key: string) {}
  }
}
