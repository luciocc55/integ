import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfesionalesEspecialidadesComponent } from './profesionales-especialidades.component';
import { RelacionesComponentsModule } from 'src/app/components/relaciones-components/relaciones-components.module';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalesEspecialidadesComponent,
  },
];

@NgModule({
  declarations: [ProfesionalesEspecialidadesComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    RelacionesComponentsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class ProfesionalesEspecialidadesModule {}
