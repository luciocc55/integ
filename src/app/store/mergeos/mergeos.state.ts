import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  StateOperator,
  Selector,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { MergeosActions } from './mergeos.actions';

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
  public master!: boolean;
  public selected!: boolean;
}
export class Pagination {
  public count!: number;
  public current!: number;
  public page_size!: number;
  public total_pages!: number;
}
export class MergeosStateModel {
  public token!: any;
  public pagination?: Pagination;
  public toMerge!: ToMerge[];
  public selected!: ToMerge[];
}

const defaults = {
  token: null,
  toMerge: [],
  selected: [],
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
  constructor(private profesionalesService: ProfesionalesService) {}
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
  MergeProfesionales({ getState, setState }: StateContext<MergeosStateModel>) {
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
              const ids = state.selected.map((item) => item.id);
              const newMerge = state.toMerge.filter(
                (item) => !ids.includes(item.id)
              );
              const newSelect: ToMerge[] = [];
              setState(
                patch({ ...getState(), toMerge: newMerge, selected: newSelect })
              );
            },
            (err) => {
              throw err.error?.error;
            }
          )
        );
    }
    return null;
  }
  @Action(MergeosActions.LoadProfesionales)
  loadProfs(
    { getState, setState }: StateContext<MergeosStateModel>,
    { search, page, pageSize }: MergeosActions.LoadProfesionales
  ) {
    const state = getState();
    return this.profesionalesService.BusParaMerge(search, page, pageSize).pipe(
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
              descripcion:
                registro.nombre +
                (registro.apellido ? ' ' + registro.apellido : ''),
            };
          });
          delete result.results;
          setState(
            patch({ ...getState(), toMerge: mergeo, pagination: { ...result } })
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
          const toMergeNew = state.toMerge.filter((item) => item.id !== id);
          const selectedNew = state.selected.filter((item) => item.id !== id);
          setState(
            patch({ ...getState(), toMerge: toMergeNew, selected: selectedNew })
          );
        },
        (err) => {}
      )
    );
  }
}
