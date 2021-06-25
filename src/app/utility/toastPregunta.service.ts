import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastPreguntaComponent } from '../components/globales/toast-pregunta/toast-pregunta.component';

@Injectable()
export class ToastPreguntaService {
  constructor(private snackBar: MatSnackBar) {}

  openStandard(): MatSnackBarRef<ToastPreguntaComponent> {
    const ref = this.snackBar.openFromComponent(ToastPreguntaComponent, {
      data: {
        headerClass: 'bg-yellow-500 text-white',
        header: 'toast.confirmacion',
        texto: 'toast.preguntaOperacion',
      },
      panelClass: ['mobile:w-full', 'shadow-none'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
    return ref;
  }
}
