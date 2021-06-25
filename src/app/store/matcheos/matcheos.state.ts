import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { GlobalActions } from '../global/global.actions';
import { ToMerge } from '../mergeos/mergeos.state';
import { MatcheosActions } from './matcheos.actions';

export class Matcheados {
  public id!: number;
  public origen!: string;
  public origenId!: number;
  public idOrigen!: string;
  public descripcion!: string;
  public master!: number;
  public matcheos!: ToMerge[];
}

export class MatcheosStateModel {
  public pagination?: Pagination;
  public searchString!: string;
  public matcheos!: Matcheados[];
  public master?: any;
  public noResults!: boolean;
}

const defaults = {
  searchString: '',
  matcheos: [],
  noResults: false,
};
function formatProf(profesional: any) {
  return {
    id: profesional.id,
    origen: profesional.origen?.nombre,
    origenId: profesional.origen?.id,
    idOrigen: profesional.idOrigen,
    descripcion:
      profesional.nombre +
      (profesional.apellido ? ' ' + profesional.apellido : ''),
  };
}
@State<MatcheosStateModel>({
  name: 'matcheos',
  defaults,
})
@Injectable()
export class MatcheosState {
  constructor(private profesionalesService: ProfesionalesService) {}
  @Action(MatcheosActions.UpdateSearch)
  newSearch(
    { setState }: StateContext<MatcheosStateModel>,
    { newSearch }: MatcheosActions.UpdateSearch
  ) {
    setState(patch({ searchString: newSearch }));
  }
  @Action(MatcheosActions.UnMatchProfesional)
  unMatchProf(
    { getState, setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchProfesional
  ) {
    const state = getState();
    return this.profesionalesService.unMatchProf(idMatch).pipe(
      tap(
        (result) => {
          const newMatchs = state.matcheos.map((item) => {
            const newMatchs = item.matcheos.filter(
              (match) => match.id !== idMatch
            );
            return { ...item, matcheos: newMatchs };
          });
          setState(patch({ ...getState(), matcheos: newMatchs }));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.MatchProfesional)
  matchProf(
    { getState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch, idMaster }: MatcheosActions.MatchProfesional
  ) {
    return this.profesionalesService.matchProf(idMaster, idMatch).pipe(
      tap(
        (result) => {},
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.DeleteMasterProfesional)
  deleteMasterProf(
    { getState, setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterProfesional
  ) {
    const state = getState();
    return this.profesionalesService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          const newMatchs = state.matcheos.filter(
            (item) => item.master !== idMaster
          );
          const noResults = newMatchs.length > 1 ? false : true;
          setState(patch({ ...getState(), matcheos: newMatchs, noResults }));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.LoadMasterProfesional)
  LoadMasterProfesional(
    { getState, setState }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.LoadMasterProfesional
  ) {
    return this.profesionalesService.getMaster(idMaster).pipe(
      tap(
        (result) => {
          const registro = result.master;
          const profesionales = result.profesionales.map((item: any) => {
            return formatProf(item);
          });
          const resultado = {
            ...formatProf(registro),
            matcheos: profesionales,
            master: result.id,
          };
          setState(
            patch({
              ...getState(),
              master: resultado,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.LoadProfesionales)
  loadProfs(
    { getState, setState }: StateContext<MatcheosStateModel>,
    { page, pageSize }: MatcheosActions.LoadProfesionales
  ) {
    const state = getState();
    return this.profesionalesService
      .BusMatcheados(state.searchString, page, pageSize)
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((master: any) => {
              const registro = master.master;
              const profesionales = master.profesionales.map((item: any) => {
                return formatProf(item);
              });
              return {
                ...formatProf(registro),
                matcheos: profesionales,
                master: master.id,
              };
            });
            delete result.results;
            setState(
              patch({
                ...state,
                matcheos: matcheos,
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
