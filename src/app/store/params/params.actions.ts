export namespace ParamsActions {
  export class UpdateParams {
    static readonly type = '[Params] Update Scroll';
    constructor(public search: string = '',public page: string = '1', public pageSize: string = '25') {}
  }

}
