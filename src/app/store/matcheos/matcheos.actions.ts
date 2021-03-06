export namespace MatcheosActions {
  export class LoadProfesionales {
    static readonly type = '[Matcheos] Load Profesionales';
    constructor() {}
  }
  export class LoadMasterProfesional {
    static readonly type = '[Matcheos] Load Master Profesional';
    constructor(public idMaster: number) {}
  }
  export class LoadMasterEspecialidad {
    static readonly type = '[Matcheos] Load Master Especialidad';
    constructor(public idMaster: number) {}
  }
  export class LoadMasterPaciente {
    static readonly type = '[Matcheos] Load Master Paciente';
    constructor(public idMaster: number) {}
  }
  export class LoadMasterOs {
    static readonly type = '[Matcheos] Load Master Os';
    constructor(public idMaster: number) {}
  }
  export class LoadMasterEstudio {
    static readonly type = '[Matcheos] Load Master Estudio';
    constructor(public idMaster: number) {}
  }
  export class LoadMasterEquipo {
    static readonly type = '[Matcheos] Load Master Equipo';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterProfesional {
    static readonly type = '[Matcheos] Delete Master Profesional';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterEspecialidad {
    static readonly type = '[Matcheos] Delete Master Especialidad';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterPaciente {
    static readonly type = '[Matcheos] Delete Master Paciente';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterPacientes {
    static readonly type = '[Matcheos] Delete Master Pacientes';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterOs {
    static readonly type = '[Matcheos] Delete Master Os';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterEstudio {
    static readonly type = '[Matcheos] Delete Master Estudio';
    constructor(public idMaster: number) {}
  }
  export class DeleteMasterEquipo {
    static readonly type = '[Matcheos] Delete Master Equipos';
    constructor(public idMaster: number) {}
  }
  export class UnMatchProfesional {
    static readonly type = '[Matcheos] UnMatch Profesional';
    constructor(public idMatch: number) {}
  }
  export class UnMatchEspecialidad {
    static readonly type = '[Matcheos] UnMatch Especialidad';
    constructor(public idMatch: number) {}
  }
  export class UnMatchPaciente {
    static readonly type = '[Matcheos] UnMatch Paciente';
    constructor(public idMatch: number) {}
  }
  export class UnMatchOs {
    static readonly type = '[Matcheos] UnMatch Os';
    constructor(public idMatch: number) {}
  }
  export class UnMatchEstudio {
    static readonly type = '[Matcheos] UnMatch Estudio';
    constructor(public idMatch: number) {}
  }
  export class UnMatchEquipo {
    static readonly type = '[Matcheos] UnMatch Equipo';
    constructor(public idMatch: number) {}
  }
  export class MatchProfesional {
    static readonly type = '[Matcheos] Match Profesional';
    constructor(public idMatch: number, public idMaster: number) {}
  }
  export class LoadEspecialidades {
    static readonly type = '[Matcheos] Load Especialidades';
    constructor() {}
  }
  export class LoadPacientes {
    static readonly type = '[Matcheos] Load Pacientes';
    constructor() {}
  }
  export class LoadOs {
    static readonly type = '[Matcheos] Load Os';
    constructor() {}
  }
  export class LoadEstudios {
    static readonly type = '[Matcheos] Load Estudios';
    constructor() {}
  }
  export class LoadEquipos {
    static readonly type = '[Matcheos] Load Equipos';
    constructor() {}
  }
  export class MatchEspecialidad {
    static readonly type = '[Matcheos] Match Especialidad';
    constructor(public idMatch: number, public idMaster: number) {}
  }
  export class MatchPaciente {
    static readonly type = '[Matcheos] Match Paciente';
    constructor(public idMatch: number, public idMaster: number) {}
  }
  export class MatchOs {
    static readonly type = '[Matcheos] Match Os';
    constructor(public idMatch: number, public idMaster: number) {}
  }
  export class MatchEstudio {
    static readonly type = '[Matcheos] Match Estudio';
    constructor(public idMatch: number, public idMaster: number) {}
  }
  export class MatchEquipo {
    static readonly type = '[Matcheos] Match Equipo';
    constructor(public idMatch: number, public idMaster: number) {}
  }
}

