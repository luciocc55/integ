import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { ParamsState } from '../params/params.state';
import { DireccionesActions } from './direcciones.actions';
export class DireccionForm {
  public idGoRed!: string;
  public sinonimo!: string;
  public institucion!: string;
}

export class FormUsuarios {
  public model!: DireccionForm;
  public dirty!: boolean;
  public status!: string;
  public errors!: any;
}
export class DireccionesStateModel {
  public pagination?: Pagination;
  public direccionForm?: FormUsuarios;
}

const defaults = {
};

@State<DireccionesStateModel>({
  name: 'direcciones',
  defaults,
})
@Injectable()
export class DireccionesState {
  constructor(private direccionesService: DireccionesService, private store: Store) {}

  @Action(DireccionesActions.LoadDirecciones)
  LoadDirecciones({ setState }: StateContext<DireccionesStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.direccionesService
      .getDirecciones(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const dirs = result?.results;
            delete result.results;
            setState(
              patch({
                direcciones: dirs,
                pagination: { ...result },
              })
            );
          },
          (err) => {
            throw err.error?.error;
          }
        )
      );
  }
}
