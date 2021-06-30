import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EquiposService } from 'src/app/services/equipos.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EstudiosService } from 'src/app/services/estudios.service';
import { ObrasSocialesService } from 'src/app/services/os.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { GlobalActions } from '../global/global.actions';
import { ToMerge } from '../mergeos/mergeos.state';
import { ParamsState } from '../params/params.state';
import { MatcheosActions } from './matcheos.actions';

function deleteFromMaster(idMaster: number): StateOperator<MatcheosStateModel> {
  return (state: MatcheosStateModel) => {
    const newMatchs = state.matcheos.filter((item) => item.master !== idMaster);
    const noResults = newMatchs.length > 1 ? false : true;
    console.log({ ...state, matcheos: newMatchs, noResults });
    return { ...state, matcheos: newMatchs, noResults };
  };
}
function unmatch(idMatch: number): StateOperator<MatcheosStateModel> {
  return (state: MatcheosStateModel) => {
    const newMatchs = state.matcheos.map((item) => {
      const newMatchs = item.matcheos.filter((match) => match.id !== idMatch);
      return { ...item, matcheos: newMatchs };
    });
    return { ...state, matcheos: newMatchs };
  };
}

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
  public matcheos!: Matcheados[];
  public master?: any;
  public noResults!: boolean;
}

const defaults = {
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
  constructor(
    private profesionalesService: ProfesionalesService,
    private especialidadesService: EspecialidadesService,
    private equiposService: EquiposService,
    private estudiosService: EstudiosService,
    private osService: ObrasSocialesService,
    private pacientesService: PacientesService,
    private store: Store
  ) {}

  @Action(MatcheosActions.UnMatchEstudio)
  UnMatchEstudio(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchEstudio
  ) {
    return this.estudiosService.unMatch(idMatch).pipe(
      tap(
        (result) => {
          setState(unmatch(idMatch));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.UnMatchOs)
  UnMatchOs(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchOs
  ) {
    return this.osService.unMatch(idMatch).pipe(
      tap(
        (result) => {
          setState(unmatch(idMatch));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.UnMatchEspecialidad)
  UnMatchEspecialidad(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchEspecialidad
  ) {
    return this.especialidadesService.unMatch(idMatch).pipe(
      tap(
        (result) => {
          setState(unmatch(idMatch));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.UnMatchEquipo)
  UnMatchEquipo(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchEquipo
  ) {
    return this.equiposService.unMatch(idMatch).pipe(
      tap(
        (result) => {
          setState(unmatch(idMatch));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.UnMatchProfesional)
  unMatchProf(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchProfesional
  ) {
    return this.profesionalesService.unMatchProf(idMatch).pipe(
      tap(
        (result) => {
          setState(unmatch(idMatch));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.UnMatchPaciente)
  UnMatchPaciente(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMatch }: MatcheosActions.UnMatchPaciente
  ) {
    return this.pacientesService.unMatch(idMatch).pipe(
      tap(
        (result) => {
          setState(unmatch(idMatch));
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
    { dispatch }: StateContext<MatcheosStateModel>,
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
  @Action(MatcheosActions.MatchPaciente)
  MatchPaciente(
    { dispatch }: StateContext<MatcheosStateModel>,
    { idMatch, idMaster }: MatcheosActions.MatchPaciente
  ) {
    return this.pacientesService.match(idMaster, idMatch).pipe(
      tap(
        (result) => {},
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.MatchEspecialidad)
  MatchEspecialidad(
    { dispatch }: StateContext<MatcheosStateModel>,
    { idMatch, idMaster }: MatcheosActions.MatchEspecialidad
  ) {
    return this.especialidadesService.match(idMaster, idMatch).pipe(
      tap(
        (result) => {},
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.MatchOs)
  MatchOs(
    { dispatch }: StateContext<MatcheosStateModel>,
    { idMatch, idMaster }: MatcheosActions.MatchOs
  ) {
    return this.osService.match(idMaster, idMatch).pipe(
      tap(
        (result) => {},
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.MatchEstudio)
  MatchEstudio(
    { dispatch }: StateContext<MatcheosStateModel>,
    { idMatch, idMaster }: MatcheosActions.MatchEstudio
  ) {
    return this.estudiosService.match(idMaster, idMatch).pipe(
      tap(
        (result) => {},
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.MatchEquipo)
  MatchEquipo(
    { dispatch }: StateContext<MatcheosStateModel>,
    { idMatch, idMaster }: MatcheosActions.MatchEquipo
  ) {
    return this.equiposService.match(idMaster, idMatch).pipe(
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
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterProfesional
  ) {
    return this.profesionalesService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.DeleteMasterPaciente)
  DeleteMasterPaciente(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterPaciente
  ) {
    return this.pacientesService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.DeleteMasterOs)
  DeleteMasterOs(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterOs
  ) {
    return this.osService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }

  @Action(MatcheosActions.DeleteMasterPacientes)
  DeleteMasterPacientes(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterPacientes
  ) {
    return this.pacientesService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.DeleteMasterEspecialidad)
  DeleteMasterEspecialidad(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterEspecialidad
  ) {
    return this.especialidadesService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.DeleteMasterEquipo)
  DeleteMasterEquipo(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterEquipo
  ) {
    return this.equiposService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(MatcheosActions.DeleteMasterEstudio)
  DeleteMasterEstudio(
    { setState, dispatch }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.DeleteMasterEstudio
  ) {
    return this.estudiosService.deleteMaster(idMaster).pipe(
      tap(
        (result) => {
          setState(deleteFromMaster(idMaster));
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
    { setState }: StateContext<MatcheosStateModel>,
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
  @Action(MatcheosActions.LoadMasterPaciente)
  LoadMasterPaciente(
    { setState }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.LoadMasterPaciente
  ) {
    return this.pacientesService.getMaster(idMaster).pipe(
      tap(
        (result) => {
          const registro = result.master;
          const pacientes = result.pacientes.map((item: any) => {
            return formatProf(item);
          });
          const resultado = {
            ...formatProf(registro),
            matcheos: pacientes,
            master: result.id,
          };
          setState(
            patch({
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

  @Action(MatcheosActions.LoadMasterOs)
  LoadMasterOs(
    { setState }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.LoadMasterOs
  ) {
    return this.osService.getMaster(idMaster).pipe(
      tap(
        (result) => {
          const registro = result.master;
          const os = result.os.map((item: any) => {
            return { ...formatProf(item), descripcion: item.nombre || item.descripcion };
          });
          const resultado = {
            ...formatProf(registro),
            descripcion: registro.nombre || registro.descripcion,
            matcheos: os,
            master: result.id,
          };
          setState(
            patch({
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

  @Action(MatcheosActions.LoadMasterEspecialidad)
  LoadMasterEspecialidad(
    { setState }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.LoadMasterEspecialidad
  ) {
    return this.especialidadesService.getMaster(idMaster).pipe(
      tap(
        (result) => {
          const registro = result.master;
          const especialidades = result.especialidades.map((item: any) => {
            return { ...formatProf(item), descripcion: item.descripcion || '' };
          });
          const resultado = {
            ...formatProf(registro),
            descripcion: registro.descripcion,
            matcheos: especialidades,
            master: result.id,
          };
          setState(
            patch({
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
  @Action(MatcheosActions.LoadMasterEstudio)
  LoadMasterEstudio(
    { setState }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.LoadMasterEstudio
  ) {
    return this.estudiosService.getMaster(idMaster).pipe(
      tap(
        (result) => {
          const registro = result.master;
          const estudios = result.estudios.map((item: any) => {
            return { ...formatProf(item), descripcion: item.descripcion || '' };
          });
          const resultado = {
            ...formatProf(registro),
            descripcion: registro.descripcion,
            matcheos: estudios,
            master: result.id,
          };
          setState(
            patch({
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

  @Action(MatcheosActions.LoadMasterEquipo)
  LoadMasterEquipo(
    { setState }: StateContext<MatcheosStateModel>,
    { idMaster }: MatcheosActions.LoadMasterEquipo
  ) {
    return this.equiposService.getMaster(idMaster).pipe(
      tap(
        (result) => {
          const registro = result.master;
          const equipos = result.equipos.map((item: any) => {
            return formatProf(item);
          });
          const resultado = {
            ...formatProf(registro),
            matcheos: equipos,
            master: result.id,
          };
          setState(
            patch({
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
  loadProfs({ setState }: StateContext<MatcheosStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.profesionalesService
      .BusMatcheados(paramsState.search, paramsState.page, paramsState.pageSize)
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
  @Action(MatcheosActions.LoadPacientes)
  LoadPacientes({ setState }: StateContext<MatcheosStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.pacientesService
      .BusMatcheados(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((master: any) => {
              const registro = master.master;
              const pacientes = master.pacientes.map((item: any) => {
                return formatProf(item);
              });
              return {
                ...formatProf(registro),
                matcheos: pacientes,
                master: master.id,
              };
            });
            delete result.results;
            setState(
              patch({
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

  @Action(MatcheosActions.LoadEspecialidades)
  LoadEspecialidades({ setState }: StateContext<MatcheosStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.especialidadesService
      .BusMatcheados(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((master: any) => {
              const registro = master.master;
              const especialidades = master.especialidades.map((item: any) => {
                return {
                  ...formatProf(item),
                  descripcion: item.descripcion || '',
                };
              });
              return {
                ...formatProf(registro),
                descripcion: registro.descripcion || '',
                matcheos: especialidades,
                master: master.id,
              };
            });
            delete result.results;
            setState(
              patch({
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

  @Action(MatcheosActions.LoadOs)
  LoadOs({ setState }: StateContext<MatcheosStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.osService
      .BusMatcheados(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((master: any) => {
              const registro = master.master;
              const os = master.os.map((item: any) => {
                return {
                  ...formatProf(item),
                  descripcion: item.nombre || item.descripcion,
                };
              });
              return {
                ...formatProf(registro),
                descripcion: registro.nombre || registro.descripcion,
                matcheos: os,
                master: master.id,
              };
            });
            delete result.results;
            setState(
              patch({
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
  @Action(MatcheosActions.LoadEstudios)
  LoadEstudios({ setState }: StateContext<MatcheosStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.estudiosService
      .BusMatcheados(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((master: any) => {
              const registro = master.master;
              const estudios = master.estudios.map((item: any) => {
                return {
                  ...formatProf(item),
                  descripcion: item.descripcion || '',
                };
              });
              return {
                ...formatProf(registro),
                descripcion: registro.descripcion || '',
                matcheos: estudios,
                master: master.id,
              };
            });
            delete result.results;
            setState(
              patch({
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

  @Action(MatcheosActions.LoadEquipos)
  LoadEquipos({ setState }: StateContext<MatcheosStateModel>) {
    const paramsState = this.store.selectSnapshot(ParamsState.params);
    return this.equiposService
      .BusMatcheados(paramsState.search, paramsState.page, paramsState.pageSize)
      .pipe(
        tap(
          (result) => {
            const matcheos = result?.results.map((master: any) => {
              const registro = master.master;
              const equipos = master.equipos.map((item: any) => {
                return formatProf(item);
              });
              return {
                ...formatProf(registro),
                matcheos: equipos,
                master: master.id,
              };
            });
            delete result.results;
            setState(
              patch({
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
