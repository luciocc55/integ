export namespace MergeosActions {
  export class LoadProfesionales {
    static readonly type = '[Mergeos] Load profesionales';
    constructor() {}
  }
  export class LoadEspecialidades {
    static readonly type = '[Mergeos] Load Especialidades';
    constructor() {}
  }
  export class LoadEstudios {
    static readonly type = '[Mergeos] Load Estudios';
    constructor() {}
  }
  export class LoadOs {
    static readonly type = '[Mergeos] Load Os';
    constructor() {}
  }
  export class LoadPacientes {
    static readonly type = '[Mergeos] Load Pacientes';
    constructor() {}
  }
  export class LoadEquipos {
    static readonly type = '[Mergeos] Load Equipos';
    constructor() {}
  }
  export class DeleteProfesional {
    static readonly type = '[Mergeos] Delete Profesional';
    constructor(public id: number) {}
  }
  export class DeleteEspecialidades {
    static readonly type = '[Mergeos] Delete Especialidades';
    constructor(public id: number) {}
  }
  export class DeleteOs {
    static readonly type = '[Mergeos] Delete Os';
    constructor(public id: number) {}
  }
  export class DeletePacientes {
    static readonly type = '[Mergeos] Delete Pacientes';
    constructor(public id: number) {}
  }
  export class DeleteEstudios {
    static readonly type = '[Mergeos] Delete Estudios';
    constructor(public id: number) {}
  }
  export class DeleteEquipos {
    static readonly type = '[Mergeos] Delete Equipos';
    constructor(public id: number) {}
  }
  export class SelectItem {
    static readonly type = '[Mergeos] Select Item';
    constructor(public id: number) {}
  }
  export class UnSelectItem {
    static readonly type = '[Mergeos] Unselect Item';
    constructor(public id: number) {}
  }
  export class SelectMaster {
    static readonly type = '[Mergeos] Select Master';
    constructor(public id: number) {}
  }
  export class UnSelectMaster {
    static readonly type = '[Mergeos] Unselect Master';
    constructor(public id: number) {}
  }
  export class MergeProfesionales {
    static readonly type = '[Mergeos] Merge Profesionales';
    constructor() {}
  }
  export class MergeEspecialidades {
    static readonly type = '[Mergeos] Merge Especialidades';
    constructor() {}
  }
  export class MergeOs {
    static readonly type = '[Mergeos] Merge Os';
    constructor() {}
  }
  export class MergePacientes {
    static readonly type = '[Mergeos] Merge Pacientes';
    constructor() {}
  }
  export class MergeEstudios {
    static readonly type = '[Mergeos] Merge Estudios';
    constructor() {}
  }
  export class MergeEquipos {
    static readonly type = '[Mergeos] Merge Equipos';
    constructor() {}
  }
  export class MergeExitoso {
    static readonly type = '[Mergeos] Merge Exitoso';
    constructor() {}
  }

}
