import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { UsuariosTableComponent } from './usuarios-table/usuarios-table.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { CuentasState } from 'src/app/store/cuentas/cuentas.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [
    RolesTableComponent,
    RolesFormComponent,
    UsuariosTableComponent,
    UsuariosFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
    RouterModule,
    NgxsModule.forFeature([CuentasState]),
  ],
  exports: [
    RolesTableComponent,
    RolesFormComponent,
    UsuariosTableComponent,
    UsuariosFormComponent,
  ]
})
export class CuentasModule { }
