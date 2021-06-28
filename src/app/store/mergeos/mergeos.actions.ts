export namespace MergeosActions {
  export class LoadProfesionales {
    static readonly type = '[Mergeos] Load profesionales';
    constructor() {}
  }
  export class DeleteProfesional {
    static readonly type = '[Mergeos] Delete Profesional';
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
}
