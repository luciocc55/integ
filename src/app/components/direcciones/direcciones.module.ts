import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionesTableComponent } from './direcciones-table/direcciones-table.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DireccionesFormComponent } from './direcciones-form/direcciones-form.component';



@NgModule({
  declarations: [
    DireccionesTableComponent,
    DireccionesFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslocoModule,
  ],
  exports: [
    DireccionesTableComponent,
    DireccionesFormComponent,
  ]
})
export class DireccionesComponentsModule { }
