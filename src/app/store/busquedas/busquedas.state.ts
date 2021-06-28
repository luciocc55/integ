import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { ParamsState } from '../params/params.state';
import { BusquedasActions } from './busquedas.actions';

export class Busquedas {
  public id!: number;
  public origen!: string;
  public origenId!: number;
  public idOrigen!: string;
  public descripcion!: string;
}

export class BusquedasStateModel {
  public pagination?: Pagination;
  public resultados!: Busquedas[];
}

const defaults = {
  resultados: [],
};
function formatProf(profesional: any) {
  return {
    id: profesional.id,
    origen: profesional.origenPopulate?.nombre,
    origenId: profesional.origenPopulate?.id,
    idOrigen: profesional.idOrigen,
    descripcion:
      profesional.nombre +
      (profesional.apellido ? ' ' + profesional.apellido : ''),
  };
}
@State<BusquedasStateModel>({
  name: 'busquedas',
  defaults,
})
@Injectable()
export class BusquedasState {
  constructor(private profesionalesService: ProfesionalesService, private store: Store) {}

  @Action(BusquedasActions.BuscarProfesionales)
  busProfs(
    { setState }: StateContext<BusquedasStateModel>
  ) {
    const paramsState = this.store.selectSnapshot(ParamsState.params)
    return this.profesionalesService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const busqueda = result?.results.map((registro: any) => {
              return formatProf(registro);
            });
            delete result.results;
            setState(
              patch({
                resultados: busqueda,
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
