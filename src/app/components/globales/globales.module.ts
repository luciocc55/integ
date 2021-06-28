import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastComponent } from './toast/toast.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ScrollUpComponent } from './scroll-up/scroll-up.component';
import { ToastPreguntaComponent } from './toast-pregunta/toast-pregunta.component';
import { BusquedasTableComponent } from './busquedas-table/busquedas-table.component';
import { SearchInputComponent } from './search-input/search-input.component';



@NgModule({
  declarations: [
    DarkModeComponent,
    ToastComponent,
    ScrollUpComponent,
    ToastPreguntaComponent,
    BusquedasTableComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
  ],
  exports: [
    DarkModeComponent,
    ToastComponent,
    ScrollUpComponent,
    BusquedasTableComponent,
    SearchInputComponent
  ]
})
export class GlobalesModule { }
