import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { DireccionesComponent } from './direcciones.component';
import { DireccionesState } from 'src/app/store/direcciones/direcciones.state';
import { DireccionesComponentsModule } from 'src/app/components/direcciones/direcciones.module';
import { CuentasRoutingModule } from './direcciones-routing.module';


@NgModule({
  declarations: [DireccionesComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    CuentasRoutingModule,
    DireccionesComponentsModule,
    NgxsModule.forFeature([DireccionesState]),
  ],
  providers: [],
})
export class DireccionesModule {}
