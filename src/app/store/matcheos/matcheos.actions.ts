export namespace MatcheosActions {
  export class LoadProfesionales {
    static readonly type = '[Matcheos] Load profesionales';
    constructor() {}
  }
  export class LoadMasterProfesional {
    static readonly type = '[Matcheos] Load Master Profesional';
    constructor(public idMaster: number) {}
  }

  export class DeleteMasterProfesional {
    static readonly type = '[Matcheos] Delete Master Profesional';
    constructor(public idMaster: number) {}
  }
  export class UnMatchProfesional {
    static readonly type = '[Matcheos] UnMatch Profesional';
    constructor(public idMatch: number) {}
  }
  export class MatchProfesional {
    static readonly type = '[Matcheos] Match Profesional';
    constructor(public idMatch: number, public idMaster: number) {}
  }
}

