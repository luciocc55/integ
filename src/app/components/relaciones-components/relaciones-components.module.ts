import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelacionesTableComponent } from './relaciones-table/relaciones-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { AgregarModalComponent } from './agregar-modal/agregar-modal.component';



@NgModule({
  declarations: [
    RelacionesTableComponent,
    AgregarModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
  ],
  exports: [
    RelacionesTableComponent,
    AgregarModalComponent
  ]
})
export class RelacionesComponentsModule { }
