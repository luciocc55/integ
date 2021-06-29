import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { TasksService } from 'src/app/services/tasks.service';
import { GlobalActions } from '../global/global.actions';
import { TasksActions } from './tasks.actions';

export class TasksStateModel {}

const defaults = {};

@State<TasksStateModel>({
  name: 'tasks',
  defaults,
})
@Injectable()
export class TasksState {
  constructor(private tasksService: TasksService) {}
  @Action(TasksActions.Profesionales)
  profesionales({ dispatch }: StateContext<TasksStateModel>) {
    return this.tasksService.taskProfesionales().pipe(
      tap(
        (result) => {
          dispatch(new GlobalActions.OpenSuccess('toast.migracion'));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(TasksActions.Direcciones)
  Direcciones({ dispatch }: StateContext<TasksStateModel>) {
    return this.tasksService.taskDirecciones().pipe(
      tap(
        (result) => {
          dispatch(new GlobalActions.OpenSuccess('toast.migracion'));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(TasksActions.Especialidades)
  Especialidades({ dispatch }: StateContext<TasksStateModel>) {
    return this.tasksService.taskEspecialidades().pipe(
      tap(
        (result) => {
          dispatch(new GlobalActions.OpenSuccess('toast.migracion'));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(TasksActions.Estudios)
  Estudios({ dispatch }: StateContext<TasksStateModel>) {
    return this.tasksService.taskEstudios().pipe(
      tap(
        (result) => {
          dispatch(new GlobalActions.OpenSuccess('toast.migracion'));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(TasksActions.Equipos)
  Equipos({ dispatch }: StateContext<TasksStateModel>) {
    return this.tasksService.taskEquipos().pipe(
      tap(
        (result) => {
          dispatch(new GlobalActions.OpenSuccess('toast.migracion'));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
  @Action(TasksActions.ProfesionalesEspecialidades)
  ProfesionalesEspecialidades({ dispatch }: StateContext<TasksStateModel>) {
    return this.tasksService.taskProfEsp().pipe(
      tap(
        (result) => {
          dispatch(new GlobalActions.OpenSuccess('toast.migracion'));
        },
        (err) => {
          dispatch(new GlobalActions.OpenAlert('toast.mergeoError'));
          throw err.error?.error;
        }
      )
    );
  }
}
