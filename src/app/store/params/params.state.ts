import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { ParamsActions } from './params.actions';

export class ParamsStateModel {
  public search!: string;
  public page!: string;
  public pageSize!: string;
}

const defaults = {
   search:'',
   page :'1',
   pageSize: '25',
};

@State<ParamsStateModel>({
  name: 'params',
  defaults,
})
@Injectable()
export class ParamsState {
  @Selector()
  static params(state: ParamsStateModel) {
    return {search: state.search, page: state.page, pageSize: state.pageSize}
  }
  constructor(
  ) {}
  @Action(ParamsActions.UpdateParams)
  updateParams(
    { setState }: StateContext<ParamsStateModel>,
    { search, page, pageSize }: ParamsActions.UpdateParams
  ) {
    setState(patch({ search, page, pageSize }));
  }
}
