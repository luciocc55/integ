import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  StateOperator,
  Selector,
  Store,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EquiposService } from 'src/app/services/equipos.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EstudiosService } from 'src/app/services/estudios.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { GlobalActions } from '../global/global.actions';
import { ParamsState } from '../params/params.state';
import { MergeosActions } from './mergeos.actions';

function deleteRegistro(id: number): StateOperator<MergeosStateModel> {
  return (state: MergeosStateModel) => {
    const toMergeNew = state.toMerge.filter((item) => item.id !== id);
    const selectedNew = state.selected.filter((item) => item.id !== id);
    return { ...state, toMerge: toMergeNew, selected: selectedNew };
  };
}
function actSelected(
  bool: boolean,
  master: boolean,
  id: number
): StateOperator<MergeosStateModel> {
  return (state: MergeosStateModel) => {
    const item = state.toMerge.find((item) => item.id === id);
    const existMaster = state.selected.find((item) => item.master);
    const existMasterToMerge = state.toMerge.find((item) => item.master);
    const isSelected = state.selected.find((item) => item.id === id);
    let newSelected = [...state.selected];
    if (existMaster && master) {
      newSelected = newSelected.map((item) => ({ ...item, master: false }));
    }
    if (bool) {
      if (!isSelected && item) {
        newSelected = [...newSelected, { ...item, master }];
      } else {
        newSelected = newSelected.map((item) => {
          if (item.id === id) {
            return { ...item, master };
          }
          return item;
        });
      }
    } else {
      if (isSelected && item) {
        newSelected = newSelected.filter((item) => item.id !== item.id);
      }
    }
    newSelected = newSelected.sort((a, b) => {
      if (a.master) {
        return -1;
      }
      if (b.master) {
        return 1;
      }
      return 0;
    });
    const toMergeNew = state.toMerge.map((item) => {
      if (item.id === id) {
        return { ...item, selected: bool, master };
      } else {
        if (existMasterToMerge && master) {
          return { ...item, master: false };
        }
        return item;
      }
    });
    return {
      ...state,
      selected: newSelected,
      toMerge: toMergeNew,
    };
  };
}
export class ToMerge {
  public id!: number;
  public origen!: string;
  public origenId!: number;
  public idOrigen!: string;
  public descripcion!: string;
  public fechaCreacion!: string;
  public master!: boolean;
  public selected!: boolean;
}

export class MergeosStateModel {
  public token!: any;
  public pagination?: Pagination;
  public toMerge!: ToMerge[];
  public selected!: ToMerge[];
  public noResults!: boolean;
}

const defaults = {
  token: null,
  toMerge: [],
  selected: [],
  noResults: false,
};

@State<MergeosStateModel>({
  name: 'mergeos',
  defaults,
})
@Injectable()
export class MergeosState {
  @Selector()
  static existMaster(state: MergeosStateModel) {
    const exist = state.selected.find((item) => item.master);
    if (exist) {
      return true;
    }
    return false;
  }
  constructor(
    private profesionalesService: ProfesionalesService,
    private especialidadesService: EspecialidadesService,
    private equiposService: EquiposService,
    private estudiosService: EstudiosService,
    private store: Store
  ) {}
  @Action(MergeosActions.SelectItem)
  SelectItem(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.SelectItem
  ) {
    setState(actSelected(true, false, id));
  }
  @Action(MergeosActions.UnSelectItem)
  UnSelectItem(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.SelectItem
  ) {
    setState(actSelected(false, false, id));
  }

  @Action(MergeosActions.MergeExitoso)
  mergeExitoso({
    setState,
    getState,
    dispatch,
  }: StateContext<MergeosStateModel>) {
    const state = getState();
    const ids = state.selected.map((item) => item.id);
    const newMerge = state.toMerge.filter((item) => !ids.includes(item.id));
    const newSelect: ToMerge[] = [];
    const noResults = newMerge.length > 1 ? false : true;
    setState(
      patch({
        ...getState(),
        toMerge: newMerge,
        selected: newSelect,
        noResults: noResults,
      })
    );
    dispatch(new GlobalActions.OpenSuccess('toast.mergeoExito'));
  }

  @Action(MergeosActions.SelectMaster)
  SelectMaster(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.SelectItem
  ) {
    setState(actSelected(true, true, id));
  }
  @Action(MergeosActions.UnSelectMaster)
  UnSelectMaster(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.SelectItem
  ) {
    setState(actSelected(true, false, id));
  }

  @Action(MergeosActions.MergeProfesionales)
  MergeProfesionales({ getState, dispatch }: StateContext<MergeosStateModel>) {
    const state = getState();
    const master = state.selected.find((item) => item.master);
    if (master) {
      const registros = state.selected
        .filter((item) => !item.master)
        .map((item) => ({ origen: item.origenId, idOrigen: item.idOrigen }));
      return this.profesionalesService
        .mergeo(
          { origen: master.origenId, idOrigen: master.idOrigen },
          registros
        )
        .pipe(
          tap(
            (result) => {
              dispatch(new MergeosActions.MergeExitoso());
            },
            (err) => {
              dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }
  @Action(MergeosActions.LoadProfesionales)
  loadProfs({ getState, setState }: StateContext<MergeosStateModel>) {
    const state = getState();
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.profesionalesService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const mergeo = result?.results.map((registro: any) => {
              const selected = state.selected.find(
                (item) => item.id === registro.id
              );
              const master = state.selected.find(
                (item) => item.id === registro.id && item.master
              );
              return {
                id: registro.id,
                origen: registro.origenPopulate?.nombre,
                origenId: registro.origenPopulate?.id,
                idOrigen: registro.idOrigen,
                master: master ? true : false,
                selected: selected ? true : false,
                fechaCreacion: registro.createdAt,
                descripcion:
                  registro.nombre +
                  (registro.apellido ? ' ' + registro.apellido : ''),
              };
            });
            delete result.results;
            setState(
              patch({
                toMerge: mergeo,
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
  @Action(MergeosActions.LoadEspecialidades)
  LoadEspecialidades({ getState, setState }: StateContext<MergeosStateModel>) {
    const state = getState();
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.especialidadesService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const mergeo = result?.results.map((registro: any) => {
              const selected = state.selected.find(
                (item) => item.id === registro.id
              );
              const master = state.selected.find(
                (item) => item.id === registro.id && item.master
              );
              return {
                id: registro.id,
                origen: registro.origenPopulate?.nombre,
                origenId: registro.origenPopulate?.id,
                idOrigen: registro.idOrigen,
                master: master ? true : false,
                selected: selected ? true : false,
                fechaCreacion: registro.createdAt,
                descripcion: registro.descripcion,
              };
            });
            delete result.results;
            setState(
              patch({
                toMerge: mergeo,
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
  @Action(MergeosActions.LoadEstudios)
  LoadEstudios({ getState, setState }: StateContext<MergeosStateModel>) {
    const state = getState();
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.estudiosService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const mergeo = result?.results.map((registro: any) => {
              const selected = state.selected.find(
                (item) => item.id === registro.id
              );
              const master = state.selected.find(
                (item) => item.id === registro.id && item.master
              );
              return {
                id: registro.id,
                origen: registro.origenPopulate?.nombre,
                origenId: registro.origenPopulate?.id,
                idOrigen: registro.idOrigen,
                master: master ? true : false,
                selected: selected ? true : false,
                fechaCreacion: registro.createdAt,
                descripcion: registro.descripcion,
              };
            });
            delete result.results;
            setState(
              patch({
                toMerge: mergeo,
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

  @Action(MergeosActions.LoadEquipos)
  LoadEquipos({ getState, setState }: StateContext<MergeosStateModel>) {
    const state = getState();
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.equiposService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const mergeo = result?.results.map((registro: any) => {
              const selected = state.selected.find(
                (item) => item.id === registro.id
              );
              const master = state.selected.find(
                (item) => item.id === registro.id && item.master
              );
              return {
                id: registro.id,
                origen: registro.origenPopulate?.nombre,
                origenId: registro.origenPopulate?.id,
                idOrigen: registro.idOrigen,
                master: master ? true : false,
                selected: selected ? true : false,
                fechaCreacion: registro.createdAt,
                descripcion:
                  registro.nombre +
                  (registro.apellido ? ' ' + registro.apellido : ''),
              };
            });
            delete result.results;
            setState(
              patch({
                toMerge: mergeo,
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

  @Action(MergeosActions.DeleteProfesional)
  delProf(
    { getState, setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.DeleteProfesional
  ) {
    const state = getState();
    return this.profesionalesService.deleteProf(id).pipe(
      tap(
        (result) => {
          setState(deleteRegistro(id));
        },
        (err) => {}
      )
    );
  }
  @Action(MergeosActions.DeleteEspecialidades)
  DeleteEspecialidades(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.DeleteEspecialidades
  ) {
    return this.especialidadesService.delete(id).pipe(
      tap(
        (result) => {
          setState(deleteRegistro(id));
        },
        (err) => {}
      )
    );
  }
  @Action(MergeosActions.DeleteEstudios)
  DeleteEstudios(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.DeleteEstudios
  ) {
    return this.estudiosService.delete(id).pipe(
      tap(
        (result) => {
          setState(deleteRegistro(id));
        },
        (err) => {}
      )
    );
  }

  @Action(MergeosActions.DeleteEquipos)
  DeleteEquipos(
    { setState }: StateContext<MergeosStateModel>,
    { id }: MergeosActions.DeleteEquipos
  ) {
    return this.equiposService.delete(id).pipe(
      tap(
        (result) => {
          setState(deleteRegistro(id));
        },
        (err) => {}
      )
    );
  }

  @Action(MergeosActions.MergeEspecialidades)
  MergeEspecialidades({ getState, dispatch }: StateContext<MergeosStateModel>) {
    const state = getState();
    const master = state.selected.find((item) => item.master);
    if (master) {
      const registros = state.selected
        .filter((item) => !item.master)
        .map((item) => ({ origen: item.origenId, idOrigen: item.idOrigen }));
      return this.especialidadesService
        .mergeo(
          { origen: master.origenId, idOrigen: master.idOrigen },
          registros
        )
        .pipe(
          tap(
            (result) => {
              dispatch(new MergeosActions.MergeExitoso());
            },
            (err) => {
              dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }
  @Action(MergeosActions.MergeEstudios)
  MergeEstudios({ getState, dispatch }: StateContext<MergeosStateModel>) {
    const state = getState();
    const master = state.selected.find((item) => item.master);
    if (master) {
      const registros = state.selected
        .filter((item) => !item.master)
        .map((item) => ({ origen: item.origenId, idOrigen: item.idOrigen }));
      return this.estudiosService
        .mergeo(
          { origen: master.origenId, idOrigen: master.idOrigen },
          registros
        )
        .pipe(
          tap(
            (result) => {
              dispatch(new MergeosActions.MergeExitoso());
            },
            (err) => {
              dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }

  @Action(MergeosActions.MergeEquipos)
  MergeEquipos({ getState, dispatch }: StateContext<MergeosStateModel>) {
    const state = getState();
    const master = state.selected.find((item) => item.master);
    if (master) {
      const registros = state.selected
        .filter((item) => !item.master)
        .map((item) => ({ origen: item.origenId, idOrigen: item.idOrigen }));
      return this.equiposService
        .mergeo(
          { origen: master.origenId, idOrigen: master.idOrigen },
          registros
        )
        .pipe(
          tap(
            (result) => {
              dispatch(new MergeosActions.MergeExitoso());
            },
            (err) => {
              dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }
}
