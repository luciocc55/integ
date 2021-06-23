import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { ToastPreguntaComponent } from 'src/app/components/globales/toast-pregunta/toast-pregunta.component';
import { ToastComponent } from 'src/app/components/globales/toast/toast.component';
import { GlobalActions } from './global.actions';

export class GlobalStateModel {
  public scroll!: number;
  public showFloatMenu!: boolean;
  public sideExpanded!: boolean;
  public showLoading!: boolean[];
}

const defaults = {
  scroll: 0,
  showFloatMenu: true,
  sideExpanded: false,
  showLoading: [],
};

@State<GlobalStateModel>({
  name: 'global',
  defaults,
})
@Injectable()
export class GlobalState {
  @Selector()
  static isLoading(state: GlobalStateModel) {
    const isLoading = state.showLoading.find((elem) => elem);
    if (isLoading) {
      return true;
    } else {
      return false;
    }
  }
  constructor(
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {}
  @Action(GlobalActions.UpdateScroll)
  updScroll(
    { getState, setState }: StateContext<GlobalStateModel>,
    { scroll }: GlobalActions.UpdateScroll
  ) {
    const state = getState();
    setState(patch({ ...state, scroll }));
  }

  @Action(GlobalActions.OpenAlert)
  OpenAlert(
    {  }: StateContext<GlobalStateModel>,
    { errorMsg }: GlobalActions.OpenAlert
  ) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        headerClass: 'bg-red-500  text-white',
        header: 'toast.errorTitle',
        texto: errorMsg,
      },
      panelClass: ['mobile:w-full', 'shadow-none'],
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  @Action(GlobalActions.OpenSuccess)
  OpenSuccess(
    { }: StateContext<GlobalStateModel>,
    { successMsg }: GlobalActions.OpenSuccess
  ) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        headerClass: 'bg-green-500 text-white',
        header: 'toast.successTitle',
        texto: successMsg,
      },
      panelClass: ['mobile:w-full', 'shadow-none'],
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  @Action(GlobalActions.ChangeSideMode)
  sideMode({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState(patch({ ...state, sideExpanded: !state.sideExpanded }));
  }
  @Action(GlobalActions.HideFloatMenu)
  hide({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState(patch({ ...state, showFloatMenu: false }));
  }
  @Action(GlobalActions.ShowFloatMenu)
  show({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState(patch({ ...state, showFloatMenu: true }));
  }
  @Action(GlobalActions.ShowLoader)
  showLoader({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState(patch({ showLoading: [...state.showLoading, true] }));
  }
  @Action(GlobalActions.HideLoader)
  hideLoader({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    const newShowLoading = [...state.showLoading].splice(1);
    setState(patch({ showLoading: newShowLoading }));
  }
}
