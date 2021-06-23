export namespace GlobalActions {
  export class UpdateScroll {
    static readonly type = '[Global] Update Scroll';
    constructor(public scroll: number) {}
  }
  export class HideFloatMenu {
    static readonly type = '[Global] Hide Float Menu';
    constructor() {}
  }
  export class ShowFloatMenu {
    static readonly type = '[Global] Show Float Menu';
    constructor() {}
  }
  export class ChangeSideMode {
    static readonly type = '[Global] Change Side Mode';
    constructor() {}
  }
  export class ShowLoader {
    static readonly type = '[Global] Show Loader';
    constructor() {}
  }
  export class HideLoader {
    static readonly type = '[Global] Hide Loader';
    constructor() {}
  }
  export class OpenAlert {
    static readonly type = '[Global] Open Alert';
    constructor(public errorMsg:string) {}
  }
  export class OpenSuccess {
    static readonly type = '[Global] Open Success';
    constructor(public successMsg:string) {}
  }
}
