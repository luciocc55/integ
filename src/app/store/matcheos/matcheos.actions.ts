export namespace MatcheosActions {
  export class LoadProfesionales {
    static readonly type = '[Matcheos] Load profesionales';
    constructor(public page: string, public pageSize: string) {}
  }
  export class LoadMasterProfesional {
    static readonly type = '[Matcheos] Load Master Profesional';
    constructor(public idMaster: number) {}
  }
  export class UpdateSearch {
    static readonly type = '[Matcheos] Update Search';
    constructor(public newSearch: string) {}
  }
  export class DeleteMasterProfesional {
    static readonly type = '[Matcheos] Delete Master Profesional';
    constructor(public idMaster: number) {}
  }
  export class UnMatchProfesional {
    static readonly type = '[Matcheos] UnMatch Profesional';
    constructor(public idMatch: number) {}
  }
}

