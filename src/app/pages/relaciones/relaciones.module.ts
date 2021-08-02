import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ParamsState } from 'src/app/store/params/params.state';
import { RelacionesComponent } from './relaciones.component';
import { RelacionesRoutingModule } from './relaciones-routing.module';
import { RelacionesState } from 'src/app/store/relaciones/relaciones.state';

@NgModule({
  declarations: [RelacionesComponent],
  imports: [
    CommonModule,
    RelacionesRoutingModule,
    NgxsModule.forFeature([ParamsState,RelacionesState]),
  ],
})
export class RelacionesModule {}
