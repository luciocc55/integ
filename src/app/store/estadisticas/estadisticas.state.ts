import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { EstadisticasActions } from './estadisticas.actions';

export class EstadisticasStateModel {
  public resultados!: any;
  public profesionales?: any;
  public estudios?: any;
  public especialidades?: any;
  public equipos?: any;
  public os?: any;
  public pacientes?: any;
  public direcciones?: any;
}

const defaults = {
  resultados: [],
};

@State<EstadisticasStateModel>({
  name: 'estadisticas',
  defaults,
})
@Injectable()
export class EstadisticasState {
  constructor(private estadisticasService: EstadisticasService) {}
  @Action(EstadisticasActions.LoadPacientes)
  LoadPacientes({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasPacientes().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              pacientes: result,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(EstadisticasActions.LoadEquipos)
  LoadEquipos({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasEquipos().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              equipos: result,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }

  @Action(EstadisticasActions.LoadDirecciones)
  LoadDirecciones({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasDirecciones().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              estudios: result,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(EstadisticasActions.LoadEstudios)
  LoadEstudios({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasEstudios().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              estudios: result,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(EstadisticasActions.LoadEspecialidades)
  LoadEspecialidades({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasEspecialidades().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              especialidades: result,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(EstadisticasActions.LoadOs)
  LoadOs({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasOs().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              os: result,
            })
          );
        },
        (err) => {
          throw err.error?.error;
        }
      )
    );
  }
  @Action(EstadisticasActions.LoadProfesionales)
  LoadProfesionales({ setState }: StateContext<EstadisticasStateModel>) {
    return this.estadisticasService.estadisticasProfesionales().pipe(
      tap(
        (result: any) => {
          setState(
            patch({
              profesionales: result,
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
