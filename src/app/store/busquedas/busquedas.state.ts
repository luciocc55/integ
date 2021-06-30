import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EquiposService } from 'src/app/services/equipos.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EstudiosService } from 'src/app/services/estudios.service';
import { ObrasSocialesService } from 'src/app/services/os.service';
import { PacientesService } from 'src/app/services/pacientes.service';
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
export class BusquedasCreated extends Busquedas {
  public fechaCreacion!: string;
}
export class BusquedasStateModel {
  public pagination?: Pagination;
  public resultados!: Busquedas[];
  public profesionales?: BusquedasCreated[];
  public estudios?: BusquedasCreated[];
  public especialidades?: BusquedasCreated[];
  public equipos?: BusquedasCreated[];
  public os?: BusquedasCreated[];
  public pacientes?: BusquedasCreated[];
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
function formatRegistro(registro: any) {
  return {
    id: registro.id,
    origen: registro.origenPopulate?.nombre,
    origenId: registro.origenPopulate?.id,
    idOrigen: registro.idOrigen,
    fechaCreacion: registro.createdAt,
  };
}
@State<BusquedasStateModel>({
  name: 'busquedas',
  defaults,
})
@Injectable()
export class BusquedasState {
  constructor(
    private profesionalesService: ProfesionalesService,
    private especialidadesService: EspecialidadesService,
    private equiposService: EquiposService,
    private estudiosService: EstudiosService,
    private pacientesService: PacientesService,
    private osService: ObrasSocialesService,
    private store: Store
  ) {}

  @Action(BusquedasActions.BuscarPacientes)
  BuscarPacientes({ setState }: StateContext<BusquedasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.pacientesService
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
  @Action(BusquedasActions.BuscarProfesionales)
  busProfs({ setState }: StateContext<BusquedasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
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
  @Action(BusquedasActions.BuscarEspecialidades)
  BuscarEspecialidades({ setState }: StateContext<BusquedasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.especialidadesService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const busqueda = result?.results.map((registro: any) => {
              return {
                ...formatProf(registro),
                descripcion: registro.descripcion,
              };
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

  @Action(BusquedasActions.BuscarOs)
  BuscarOs({ setState }: StateContext<BusquedasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.osService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const busqueda = result?.results.map((registro: any) => {
              return {
                ...formatProf(registro),
                descripcion: registro.nombre || registro.descripcion,
              };
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
  @Action(BusquedasActions.BuscarEstudios)
  BuscarEstudios({ setState }: StateContext<BusquedasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.estudiosService
      .BusParaMerge(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const busqueda = result?.results.map((registro: any) => {
              return {
                ...formatProf(registro),
                descripcion: registro.descripcion,
              };
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

  @Action(BusquedasActions.BuscarEquipos)
  BuscarEquipos({ setState }: StateContext<BusquedasStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.equiposService
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

  @Action(BusquedasActions.UltimosOs)
  UltimosOs({ setState }: StateContext<BusquedasStateModel>) {
    return this.osService.ultimos().pipe(
      tap(
        (result: any) => {
          const busqueda = result.map((registro: any) => {
            const mapped: BusquedasCreated = {
              ...formatRegistro(registro),
              descripcion: registro.nombre || registro.descripcion,
            };
            return mapped;
          });
          setState(
            patch({
              os: busqueda,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(BusquedasActions.UltimosPacientes)
  UltimosPacientes({ setState }: StateContext<BusquedasStateModel>) {
    return this.pacientesService.ultimos().pipe(
      tap(
        (result: any) => {
          const busqueda = result.map((registro: any) => {
            const mapped: BusquedasCreated = {
              ...formatRegistro(registro),
              descripcion:
                registro.nombre +
                (registro.apellido ? ' ' + registro.apellido : ''),
            };
            return mapped;
          });
          setState(
            patch({
              pacientes: busqueda,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }

  @Action(BusquedasActions.UltimosProfesionales)
  UltimosProfesionales({ setState }: StateContext<BusquedasStateModel>) {
    return this.profesionalesService.ultimos().pipe(
      tap(
        (result: any) => {
          const busqueda = result.map((registro: any) => {
            const mapped: BusquedasCreated = {
              ...formatRegistro(registro),
              descripcion:
                registro.nombre +
                (registro.apellido ? ' ' + registro.apellido : ''),
            };
            return mapped;
          });
          setState(
            patch({
              profesionales: busqueda,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(BusquedasActions.UltimosEquipos)
  UltimosEquipos({ setState }: StateContext<BusquedasStateModel>) {
    return this.equiposService.ultimos().pipe(
      tap(
        (result: any) => {
          const busqueda = result.map((registro: any) => {
            const mapped: BusquedasCreated = {
              ...formatRegistro(registro),
              descripcion:
                registro.nombre +
                (registro.apellido ? ' ' + registro.apellido : ''),
            };
            return mapped;
          });
          setState(
            patch({
              equipos: busqueda,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(BusquedasActions.UltimosEspecialidades)
  UltimosEspecialidades({ setState }: StateContext<BusquedasStateModel>) {
    return this.especialidadesService.ultimos().pipe(
      tap(
        (result: any) => {
          const busqueda = result.map((registro: any) => {
            const mapped: BusquedasCreated = {
              ...formatRegistro(registro),
              descripcion: registro.descripcion,
            };
            return mapped;
          });
          setState(
            patch({
              especialidades: busqueda,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(BusquedasActions.UltimosEstudios)
  UltimosEstudios({ setState }: StateContext<BusquedasStateModel>) {
    return this.estudiosService.ultimos().pipe(
      tap(
        (result: any) => {
          const busqueda = result.map((registro: any) => {
            const mapped: BusquedasCreated = {
              ...formatRegistro(registro),
              descripcion: registro.descripcion,
            };
            return mapped;
          });
          setState(
            patch({
              estudios: busqueda,
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
