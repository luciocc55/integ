export namespace MergeosActions {
  export class LoadProfesionales {
    static readonly type = '[Mergeos] Load profesionales';
    constructor(public page: string, public pageSize: string) {}
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
  export class UpdateSearch {
    static readonly type = '[Mergeos] Update Search';
    constructor(public newSearch: string) {}
  }
}
