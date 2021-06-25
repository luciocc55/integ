import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EstatusService } from 'src/app/services/estatus.service';
import { EstatusActions } from './estatus.actions';

export class Estatus {
  public _id!: string;
  public id!: number;
  public caidas!: number;
  public cambio!: string;
  public habilitado!: boolean;
  public nombre!: string;
}
export class EstatusStateModel {
  public estatus!: Estatus[];
}

const defaults = {
  estatus: [],
};

@State<EstatusStateModel>({
  name: 'estatus',
  defaults,
})
@Injectable()
export class EstatusState {
  constructor(private estatusService: EstatusService) {}
  @Action(EstatusActions.LoadEstatus)
  load(
    { getState, setState }: StateContext<EstatusStateModel>,
    {}: EstatusActions.LoadEstatus
  ) {
    return this.estatusService.getEstatus().pipe(
      tap(
        (result) => {
          setState(patch({ ...getState(), estatus: result }));
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(EstatusActions.UpdateEstatus)
  update(
    { dispatch }: StateContext<EstatusStateModel>,
    { value, estatus }: EstatusActions.UpdateEstatus
  ) {
    return this.estatusService.updateEstatus(estatus, value).pipe(
      tap(
        (result) => {
          dispatch(new EstatusActions.LoadEstatus());
        },
        (err) => {
          dispatch(new EstatusActions.LoadEstatus());
          throw err.error?.error;
        }
      )
    );
  }
}
