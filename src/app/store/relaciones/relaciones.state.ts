import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EquiposService } from 'src/app/services/equipos.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EstudiosService } from 'src/app/services/estudios.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { RelacionesService } from 'src/app/services/relaciones.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { GlobalActions } from '../global/global.actions';
import { ParamsState } from '../params/params.state';
import { RelacionesActions } from './relaciones.actions';

export class RelacionesStateModel {
  public resultados!: Relacion[];
  public pagination?: Pagination;
  public selected1?: Registro;
  public selected2!: Registro[];
  public busqueda1?: Busquedas;
  public busqueda2?: Busquedas;
}
export class Busquedas {
  public value!: string;
  public results?: Registro[];
}
export class Registro {
  public descripcion!: string;
  public id!: number;
  public origen!: string;
  public origenId!: number;
  public idOrigen!: string;
}
export class Relacion {
  public idRelacion!: number[];
  public registroGroup!: Registro;
  public relaciones!: Registro[];
}
const defaults = {
  selected2: [],
  resultados: [],
};
export function formatProf(profesional: any) {
  return {
    id: profesional.id,
    origen: profesional.origenPopulate?.nombre,
    origenId: profesional.origen,
    idOrigen: profesional.idOrigen,
    descripcion:
      profesional.nombre +
      (profesional.apellido ? ' ' + profesional.apellido : ''),
  };
}
@State<RelacionesStateModel>({
  name: 'relaciones',
  defaults,
})
@Injectable()
export class RelacionesState {
  constructor(
    private relacionesService: RelacionesService,
    private profesionalesService: ProfesionalesService,
    private especialidadesService: EspecialidadesService,
    private equiposService: EquiposService,
    private estudiosService: EstudiosService,
    private translocoService: TranslocoService,
    private store: Store
  ) {}
  @Action(RelacionesActions.UpdateState)
  UpdateState(
    { setState }: StateContext<RelacionesStateModel>,
    { values }: RelacionesActions.UpdateState
  ) {
    setState(patch({ ...values }));
  }
  @Action(RelacionesActions.Add)
  Add(
    { setState, getState }: StateContext<RelacionesStateModel>,
    { item }: RelacionesActions.Add
  ) {
    const state = getState();
    const exist = state.selected2?.find((element) => element.id === item.id);
    if (!exist) {
      const newSelected = [...state.selected2, item];
      setState(patch({ selected2: newSelected }));
    }
  }
  @Action(RelacionesActions.Remove)
  Remove(
    { setState, getState }: StateContext<RelacionesStateModel>,
    { item }: RelacionesActions.Remove
  ) {
    const state = getState();
    const newSelected = state.selected2?.filter(
      (element) => element.id !== item.id
    );
    setState(patch({ selected2: newSelected }));
  }

  @Action(RelacionesActions.GuardarRelacionesEquipEst)
  GuardarRelacionesEquipEst(
    { dispatch }: StateContext<RelacionesStateModel>,
    { equipo, estudio }: RelacionesActions.GuardarRelacionesEquipEst
  ) {
    return this.relacionesService
      .guardarEquipEst({ equipo, estudio })
      .pipe(
        tap(
          (result) => {},
          (err) => {
            if (err.error?.code === 101) {
              const msg =
                this.translocoService.translateObject('toast.duplicado') +
                ' ' +
                equipo +
                ' / ' +
                estudio;
              dispatch(new GlobalActions.OpenAlert(msg));
            } else {
              dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
            }
            throw err.error?.error;
          }
        )
      );
  }
  @Action(RelacionesActions.GuardarRelacionesProfEsp)
  GuardarRelacionesProfEsp(
    { dispatch }: StateContext<RelacionesStateModel>,
    { profesional, especialidad }: RelacionesActions.GuardarRelacionesProfEsp
  ) {
    return this.relacionesService
      .guardarProfEsp({ profesional, especialidad })
      .pipe(
        tap(
          (result) => {},
          (err) => {
            if (err.error?.code === 101) {
              const msg =
                this.translocoService.translateObject('toast.duplicado') +
                ' ' +
                profesional +
                ' / ' +
                especialidad;
              dispatch(new GlobalActions.OpenAlert(msg));
            } else {
              dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
            }
            throw err.error?.error;
          }
        )
      );
  }
  @Action(RelacionesActions.DeleteRelacionProfEsp)
  DeleteRelacion(
    { dispatch }: StateContext<RelacionesStateModel>,
    { idRelacion }: RelacionesActions.DeleteRelacionProfEsp
  ) {
    return this.relacionesService.deleteProfEsp(idRelacion).pipe(
      tap(
        (result) => {
          dispatch(new RelacionesActions.LoadRelacionesProfEsp());
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(RelacionesActions.DeleteRelacionEquipEst)
  DeleteRelacionEquipEst(
    { dispatch }: StateContext<RelacionesStateModel>,
    { idRelacion }: RelacionesActions.DeleteRelacionEquipEst
  ) {
    return this.relacionesService.deleteEquipEst(idRelacion).pipe(
      tap(
        (result) => {
          dispatch(new RelacionesActions.LoadRelacionEquipEst());
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(RelacionesActions.LoadEspecialidades)
  LoadEspecialidades(
    { setState, getState }: StateContext<RelacionesStateModel>,
    { key }: RelacionesActions.LoadEspecialidades
  ) {
    const state: any = getState();
    const busqueda = state[key]?.value;
    return this.especialidadesService.busAll(busqueda).pipe(
      tap(
        (result) => {
          const especialidades = result.results.map((item: any) => {
            return {
              descripcion: item.descripcion,
              id: item.id,
              origen: item.origenPopulate.nombre,
              origenId: item.origen.id,
              idOrigen: item.idOrigen,
            };
          });
          const resultado: any = { results: especialidades };
          setState(
            patch({
              [key]: resultado,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(RelacionesActions.LoadEquipos)
  LoadEquipos(
    { setState, getState }: StateContext<RelacionesStateModel>,
    { key }: RelacionesActions.LoadEquipos
  ) {
    const state: any = getState();
    const busqueda = state[key]?.value;
    return this.equiposService.busAll(busqueda).pipe(
      tap(
        (result) => {
          const equipos = result.results.map((item: any) => {
            return formatProf(item);
          });
          const resultado: any = { results: equipos };
          setState(
            patch({
              [key]: resultado,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(RelacionesActions.LoadEstudios)
  LoadEstudios(
    { setState, getState }: StateContext<RelacionesStateModel>,
    { key }: RelacionesActions.LoadEstudios
  ) {
    const state: any = getState();
    const busqueda = state[key]?.value;
    return this.estudiosService.busAll(busqueda).pipe(
      tap(
        (result) => {
          const estudios = result.results.map((item: any) => {
            return {
              descripcion: item.descripcion,
              id: item.id,
              origen: item.origenPopulate.nombre,
              origenId: item.origen.id,
              idOrigen: item.idOrigen,
            };
          });
          const resultado: any = { results: estudios };
          setState(
            patch({
              [key]: resultado,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(RelacionesActions.LoadProfesionales)
  LoadProfesionales(
    { setState, getState }: StateContext<RelacionesStateModel>,
    { key }: RelacionesActions.LoadProfesionales
  ) {
    const state: any = getState();
    const busqueda = state[key]?.value;
    return this.profesionalesService.busAll(busqueda).pipe(
      tap(
        (result) => {
          const profesionales = result.results.map((item: any) => {
            return formatProf(item);
          });
          const resultado: any = { results: profesionales };
          setState(
            patch({
              [key]: resultado,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }

  @Action(RelacionesActions.LoadRelacionEquipEst)
  LoadRelacionEquipEst({ setState }: StateContext<RelacionesStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.relacionesService
      .busRelacionesEquipEst(
        paramsState.search,
        paramsState.page,
        paramsState.pageSize
      )
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((registro: any) => {
              const relaciones = registro.estudios.map((item: any) => {
                return {
                  descripcion: item.descripcion,
                  id: item.id,
                  origen: item.origen.nombre,
                  origenId: item.origen.id,
                  idOrigen: item.idOrigen,
                };
              });
              return {
                idRelacion: registro.id,
                registroGroup: { ...formatProf(registro.equipo) },
                relaciones: relaciones,
              };
            });
            delete result.results;
            setState(
              patch({
                resultados: matcheos,
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
  @Action(RelacionesActions.LoadRelacionesProfEsp)
  LoadRelacionesProfEsp({ setState }: StateContext<RelacionesStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.relacionesService
      .busRelacionesProfEsp(
        paramsState.search,
        paramsState.page,
        paramsState.pageSize
      )
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((registro: any) => {
              const relaciones = registro.especialidades.map((item: any) => {
                return {
                  descripcion: item.descripcion,
                  id: item.id,
                  origen: item.origen.nombre,
                  origenId: item.origen.id,
                  idOrigen: item.idOrigen,
                };
              });
              return {
                idRelacion: registro.id,
                registroGroup: { ...formatProf(registro.profesional) },
                relaciones: relaciones,
              };
            });
            delete result.results;
            setState(
              patch({
                resultados: matcheos,
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
