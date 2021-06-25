import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RolesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
    RouterModule,
  ],
  exports: [
    RolesTableComponent
  ]
})
export class CuentasModule { }
