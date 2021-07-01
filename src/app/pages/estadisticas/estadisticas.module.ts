import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstadisticasComponent } from './estadisticas.component';
import { EstadisticasState } from 'src/app/store/estadisticas/estadisticas.state';
import { GraficosModule } from 'src/app/components/graficos/graficos.module';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasComponent,
  },
];

@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    GraficosModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([EstadisticasState]),
  ],
  providers: [],
})
export class EstadisticasModule {}
