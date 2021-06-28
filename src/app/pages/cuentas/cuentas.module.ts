import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { CuentasComponent } from './cuentas.component';
import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasState } from 'src/app/store/cuentas/cuentas.state';
import { ParamsState } from 'src/app/store/params/params.state';

@NgModule({
  declarations: [CuentasComponent],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    NgxsModule.forFeature([CuentasState, ParamsState]),
  ],
})
export class CuentasModule {}
