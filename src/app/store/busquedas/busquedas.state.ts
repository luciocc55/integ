import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
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
  public searchString!: string;
  public resultados!: Busquedas[];
}

const defaults = {
  searchString: '',
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
  constructor(private profesionalesService: ProfesionalesService) {}
  @Action(BusquedasActions.UpdateSearch)
  newSearch(
    { setState }: StateContext<BusquedasStateModel>,
    { newSearch }: BusquedasActions.UpdateSearch
  ) {
    setState(patch({ searchString: newSearch }));
  }
  @Action(BusquedasActions.BuscarProfesionales)
  busProfs(
    { getState, setState }: StateContext<BusquedasStateModel>,
    { page, pageSize }: BusquedasActions.BuscarProfesionales
  ) {
    const state = getState();
    return this.profesionalesService
      .BusParaMerge(state.searchString, page, pageSize)
      .pipe(
        tap(
          (result) => {
            const busqueda = result?.results.map((registro: any) => {
              return formatProf(registro);
            });
            delete result.results;
            setState(
              patch({
                ...getState(),
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
