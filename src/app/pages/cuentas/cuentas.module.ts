import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { CuentasComponent } from './cuentas.component';
import { CuentasRoutingModule } from './cuentas-routing.module';

@NgModule({
  declarations: [CuentasComponent],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    NgxsModule.forFeature([]),
  ],
})
export class CuentasModule {}
