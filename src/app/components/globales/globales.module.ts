import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorSnackComponent } from './error-snack/error-snack.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    DarkModeComponent,
    ErrorSnackComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DarkModeComponent,
    ToastComponent
  ]
})
export class GlobalesModule { }
